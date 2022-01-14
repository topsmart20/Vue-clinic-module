require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getAppointmentsWithMissingServices = (request, response, start, end, prm_client_id, scope) => {
  let statement = "SELECT CONCAT_WS(' ', enq.name, enq.last_name) AS lead_name, CONCAT_WS(' ', us.first_name, us.surname) AS lead_owner, " +
    "app.starts_at::date AS appointment_date, app.patient_attended AS appointment_status FROM appointments app "
  statement += "LEFT JOIN enquiries enq ON app.enquiry_id = enq.id "
  statement += "LEFT JOIN services se ON enq.id = se.enquiry_id "
  statement += "LEFT JOIN users us ON enq.user_id = us.id "
  statement += "WHERE date_trunc('day', app.starts_at) >= $1 AND(date_trunc('day', app.starts_at) - INTERVAL '1 DAY') <= $2 "
  statement += "AND se.date IS NULL "
  if (scope == 'All') {
  } else if (scope == 'PrmClient') {
    statement += "AND enq.prm_client_id = " + prm_client_id;
  }

  pool.query(statement, [start, end], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getAppointmentsWithMissingServices
}