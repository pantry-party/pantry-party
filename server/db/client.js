//Require client from pg
const { Client } = require('pg')

//Establishing the connection to the database (like how we do with http://)
const { DATABASE_URL } = require('../secrets') 
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:54321/pantryparty'

const client = new Client(connectionString)

//export for use in other files
module.exports = client