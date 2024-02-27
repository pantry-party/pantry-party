//pulling in the connection to our local database
const client = require('./client')

const { households } = require('./seedDataHouseholds')
const { users } = require('./seedDataUsers')
const { items } = require('./seedDataItems')
const { messages } = require("./seedDataMessages")

//Drop tables for data cleanliness
const dropTables = async () => {
    try {
        console.log("Starting to drop tables...")
        await client.query(`
        DROP TABLE IF EXISTS items;
        DROP TABLE IF EXISTS messages;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS households;
        `)
        console.log("Tables dropped!")
    } catch (error) {
        console.log("Error dropping tables: ", error)
    }
}

//Create tables to give data a home
const createTables = async () => {
    try {
        console.log("Building tables...")
        await client.query(`

        CREATE TABLE households (
            id SERIAL PRIMARY KEY,
            name varchar(100) NOT NULL,
            "joinCode" char(6)
        );

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name varchar(50) NOT NULL,
            username varchar(50) UNIQUE NOT NULL,
            password text NOT NULL,
            color varchar(25),
            "sharedHouse" INTEGER REFERENCES households(id),
            "defaultHouse" INTEGER REFERENCES households(id) NOT NULL
        );

        CREATE TABLE items (
            id SERIAL PRIMARY KEY,
            name varchar(50) NOT NULL,
            "dateMoved" timestamp NOT NULL,
            "inPantry" boolean NOT NULL,
            sharing boolean,
            "isLow" BOOLEAN DEFAULT false,
            category varchar(25) NOT NULL,
            expiry timestamp,
            "ownerId" INTEGER REFERENCES users(id),
            "householdId" INTEGER REFERENCES households(id) NOT NULL
        );

        CREATE TABLE messages (
            id SERIAL PRIMARY KEY,
            content varchar(255) NOT NULL,
            "userId" INTEGER REFERENCES users(id),
            "householdId" INTEGER REFERENCES households(id) NOT NULL,
            date timestamp NOT NULL
        );
        `)
        console.log("Tables built!")
    } catch (error) {
        console.error(error)
    }
}


//Populate tables to have data later
//Create households
const createInitialHouseholds = async () => {
    try {
        console.log('Initializing households table...')
        for (const household of households) {
            const {
                rows: [households]
            } = await client.query(`
                INSERT INTO households(name, "joinCode")
                VALUES($1, $2);
            `, [household.name, household.joinCode]
            )
        }
        console.log("Households initialized!")
    } catch (error) {
        throw error
    }
}

//Create users
const createInitialUsers = async () => {
    try {
        console.log('Initializing users table...')
        for (const user of users) {
            const {
                rows: [users]
            } = await client.query(`
                INSERT INTO users(name, username, password, color, "sharedHouse", "defaultHouse")
                VALUES($1, $2, $3, $4, $5, $6);
            `, [user.name, user.username, user.password, user.color, user.sharedHouse, user.defaultHouse]
            )
        }
        console.log("Users initialized!")
    } catch (error) {
        throw error
    }
}

//Create items
const createInitialItems = async () => {
    try {
        console.log('Initializing items table...')
        for (const item of items) {
            const {
                rows: [items]
            } = await client.query(`
                INSERT INTO items(name, "dateMoved", "inPantry", sharing, "isLow", category, expiry, "ownerId", "householdId")
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);
            `, [item.name, item.dateMoved, item.inPantry, item.sharing, item.isLow, item.category, item.expiry, item.ownerId, item.householdId]
            )
        }
        console.log("Items initialized!")
    } catch (error) {
        throw error
    }
}

//Create messages
const createInitialMessages = async () => {
    try {
        console.log('Initializing messages table...')
        for (const message of messages) {
            const {
                rows: [messages]
            } = await client.query(`
                INSERT INTO messages(content, "userId", "householdId", date)
                VALUES($1, $2, $3, $4);
            `, [message.content, message.user , message.household, message.date]
            )
        }
        console.log("Messages initialized!")
    } catch (error) {
        throw error
    }
}

//Call all our functions to build our database
const buildDb = async () => {
    try {
        //Actually connect to our local database
        client.connect()

        //Run our functions
        await dropTables()
        await createTables()
        await createInitialHouseholds()
        await createInitialUsers()
        await createInitialItems()
        await createInitialMessages()

    } catch (error) {
        console.error(error)
        //finally will always run, whether the catch triggers or not  
    } finally {
        //close our connection to our local database
        client.end()
    }
}

buildDb()