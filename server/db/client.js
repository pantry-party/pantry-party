//Require client from pg
const { Client } = require('pg')

//Establishing the connection to the database (like how we do with http://)
const client = new Client(`postgres://localhost:5432/pantryparty`)

//export for use in other files
module.exports = client