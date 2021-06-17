require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
})

const getCountriesList = (request, response) => {
    pool.query("SELECT * FROM countries c", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getRegionsList = (request, response) => {
    pool.query("SELECT r.id as code, r.country_id, r.name as label FROM regions r", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getLocationsList = (request, response) => {
    pool.query("SELECT id, city FROM locations WHERE prm_client_id = 1 AND active = true", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTaxRateList = (request, response, id) => {
    pool.query("SELECT tax_rate, tax_rate_label FROM vat_tax_rate WHERE country_id = $1", [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getClients = (request, response) => {
    pool.query("SELECT * FROM prm_client", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
  getCountriesList,
  getRegionsList,
  getLocationsList,
  getTaxRateList,
  getClients
}