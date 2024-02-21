//pulling in the connection to our local database
const client = require('./client')

const { households } = require('./seedDataHouseholds')
const { users } = require('./seedDataUsers')
const { items } = require('./seedDataItems')

//Drop functions for data cleanliness
const dropFunctions = async () => {
    try {
        console.log("Starting to drop functions...")
        await client.query(`
        DROP FUNCTION IF EXISTS gen_random_bytes;
        DROP FUNCTION IF EXISTS random_string;
        DROP FUNCTION IF EXISTS unique_random;
        `)
        console.log("Functions dropped!")
    } catch (error) {
        console.log("Error dropping functions: ", error)
    }
}

//Drop tables for data cleanliness
const dropTables = async () => {
    try {
        console.log("Starting to drop tables...")
        await client.query(`
        DROP TABLE IF EXISTS items;
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
            "joinCode" varchar(7)
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

//join code generation functions by Derek Sivers. Article: https://sive.rs/rand1
async function joinCodeFns() {
    try {
        console.log('Creating functions...')
        await client.query(`
            UPDATE pg_language set lanpltrusted = true where lanname = 'c';  
        `)
        await client.query(`
            create function gen_random_bytes(int) returns bytea as
            '$libdir/pgcrypto', 'pg_random_bytes' language c strict;
        `)
        await client.query(`
            create function random_string(len int) returns text as $$
            declare
            chars text[] = '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
            result text = '';
            i int = 0;
            rand bytea;
            begin
            -- generate secure random bytes and convert them to a string of chars.
            rand = gen_random_bytes($1);
            for i in 0..len-1 loop
                -- rand indexing is zero-based, chars is 1-based.
                result = result || chars[1 + (get_byte(rand, i) % array_length(chars, 1))];
            end loop;
            return result;
            end;
            $$ language plpgsql;
        `)
        await client.query(`
            create function unique_random(len int, _table text, _col text) returns text as $$
            declare
            result text;
            numrows int;
            begin
            result = random_string(len);
            loop
                execute format('select 1 from %I where %I = %L', _table, _col, result);
                get diagnostics numrows = row_count;
                if numrows = 0 then
                return result; 
                end if;
                result = random_string(len);
            end loop;
            end;
            $$ language plpgsql;
        `)
        console.log('Functions created!')
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
        await dropFunctions()
        await dropTables()
        await createTables()
        await joinCodeFns()
        await createInitialHouseholds()
        await createInitialUsers()
        await createInitialItems()

    } catch (error) {
        console.error(error)
        //finally will always run, whether the catch triggers or not  
    } finally {
        //close our connection to our local database
        client.end()
    }
}

buildDb()