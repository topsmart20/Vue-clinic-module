const router = require('express').Router()
const { getEnquiryByPhone, createEnquiryPublic } = require('~/dao/daoEnquiries')
const { createAppointment } = require('~/dao/daoAppointments')
const {
  getAppointmentSlotById,
  updateAppointmentSlot,
} = require('~/dao/daoAppointmentSlots')
const { pool, now, insert } = require('~/services/db')
const moment = require('moment')

module.exports = router

router.post(
  '/request',
  validateCreateAppointmentRequest,
  throttleVerificationRequest,
  async (request, response) => {
    const { phone } = request.body
    const vonage = require('~/services/vonage')
    let result

    try {
      result = await new Promise((resolve, reject) => {
        vonage.verify.request(
          {
            number: phone,
            brand: 'SMART PRM Dental',
          },
          (error, result) => {
            if (error != null) {
              return reject(error)
            }

            return resolve(result)
          },
        )
      })
    } catch (error) {
      return response.status(500).json(error)
    }

    if (['0', '10'].includes(result.status) === false) {
      return response.status(500).json(result)
    }

    response.status(200).json({
      requestId: result.request_id,
    })
  },
)

router.post(
  '/',
  validateCreateAppointmentRequest,
  verifyPhone,
  async (request, response) => {
    const { phone, firstName, lastName, appointmentSlotId } = request.body

    try {
      let enquiry = await getEnquiryByPhone(phone)

      if (enquiry == null) {
        enquiry = await createEnquiryPublic({ firstName, lastName, phone })
      }

      const appointment = await createAppointment({ enquiryId: enquiry.id })
      await updateAppointmentSlot(appointmentSlotId, {
        appointmentId: appointment.id,
      })
    } catch (error) {
      return response.status(500).json(error)
    }

    return response.status(201).json({})
  },
)

/**
 * @type {import('express').RequestHandler}
 */
async function validateCreateAppointmentRequest(request, response, next) {
  const { firstName, lastName, phone, appointmentSlotId } = request.body
  const appointmentSlot = await getAppointmentSlotById(appointmentSlotId)
  const activeAppointmentSlotsCount = await countActiveAppointmentSlotsByPhone(
    phone,
  )
  const rules = [
    [typeof firstName === 'string' && firstName.length > 0],
    [typeof lastName === 'string' && lastName.length > 0],
    [activeAppointmentSlotsCount <= 2, 'over-order'],
    [
      appointmentSlot != null && appointmentSlot.appointment_id == null,
      'unavailable-slot',
    ],
  ]
  const messages = rules.reduce((messages, [valid, message]) => {
    if (valid == false) {
      messages.push(message)
    }

    return messages
  }, [])

  if (messages.length > 0) {
    return response.status(422).json({ messages })
  }

  next()
}

/**
 * @type {import('express').RequestHandler}
 */
async function throttleVerificationRequest(request, response, next) {
  const { phone } = request.body
  const statement = /* sql */ `
    SELECT created_at::text as created_at FROM failed_phone_verifications
    WHERE phone = $1
  `
  const result = await pool.query(statement, [phone])
  const verification = result.rows[0]

  if (verification != null) {
    if (
      moment
        .utc(verification.created_at)
        .add(5, 'minutes')
        .isAfter(moment.utc())
    ) {
      return response.status(401).send({
        messages: 'throttled',
        status: '17',
        end_at: verification.created_at,
      })
    }

    const statement = /* sql */ `
      DELETE FROM failed_phone_verifications
      WHERE phone = $1
    `
    await pool.query(statement, [phone])
  }

  next()
}

/**
 * @type {import('express').RequestHandler}
 */
async function verifyPhone(request, response, next) {
  const vonage = require('~/services/vonage')
  const { verificationId, verificationCode, phone } = request.body
  let result

  try {
    result = await new Promise((resolve, reject) => {
      vonage.verify.check(
        {
          request_id: verificationId,
          code: verificationCode,
        },
        (error, result) => {
          if (error != null) {
            return reject(error)
          }

          return resolve(result)
        },
      )
    })
  } catch (error) {
    return response.status(500).send(error)
  }

  if (result.status === '16') {
    return response.status(422).json(result)
  }

  if (result.status === '17') {
    const verification = await insert('failed_phone_verifications', { phone })

    return response.status(422).json({
      ...result,
      end_at: verification.created_at,
    })
  }

  if (result.status !== '0') {
    return response.status(500).send(result)
  }

  next()
}

async function countActiveAppointmentSlotsByPhone(phone) {
  const statement = /* sql */ `
    SELECT COUNT(*) FROM appointment_slots
    JOIN appointments ON appointment_slots.appointment_id = appointments.id
    JOIN enquiries ON appointments.enquiry_id = enquiries.id
    WHERE enquiries.phone = $1
    AND appointment_slots.starts_at > $2
  `
  const {
    rows: [{ count }],
  } = await pool.query(statement, [phone, now()])

  return count
}
