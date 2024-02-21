//Require client from pg
const { Client } = require('pg')

//Establishing the connection to the database (like how we do with http://)
const { DATABASE_URL } = require('../secrets') 

//Render database URL -> to replace in secrets
//"postgres://pantrypartydb_user:COvnzEu7fmAz7rrd7AS6gsGhsk5an2IG@dpg-cnb4hcun7f5s73emm6tg-a/pantrypartydb"

const client = new Client(DATABASE_URL)

//export for use in other files
module.exports = client