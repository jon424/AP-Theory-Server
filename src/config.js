require('dotenv').config()
const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString =
`postgresql://postgres@localhost/comments`

const pool = new Pool({
  connectionString: isProduction ? process.env.DB_URL : connectionString,
  ssl: isProduction,
})

module.exports = {
  pool,
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://postgres@localhost/comments',
};