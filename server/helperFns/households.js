const client = require('../db/client')
const util = require('./util')

async function getHouseholdbyId (id) {
    try {
        const {
            rows: [household]
        } = await client.query(
            `
                SELECT *
                FROM households
                WHERE id =$1;
            `, [id]
        )
        return household
    } catch (error) {
        throw error
    }
}

async function getHouseholdbyJoinCode (joinCode) {
    try {
        const {
            rows: [household]
        } = await client.query(
            `
                SELECT *
                FROM households
                WHERE "joinCode" =$1;
            `, [joinCode]
        )
        return household
    } catch (error) {
        throw error
    }
}

async function getAllJoinCodes() {
    try {
        const { rows } = await client.query(
            `
                SELECT "joinCode"
                FROM households;
            `
        )
        return rows
    } catch (error) {
        throw error
    }
}

async function createSharedHousehold ({ name }) {
    try {
        let creatingCode = true
        let existingCodes = await getAllJoinCodes()
        let matchingCode
        let joinCode = ""
        const chars = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        let char = ""

        while(creatingCode) {
            for (let i = 0; i < 6; i++) {
                char = chars[Math.floor((Math.random() * chars.length))-1]
                
                joinCode = joinCode.concat(char)
                console.log("for loop", char, joinCode)
            }
            
            matchingCode = existingCodes.find((element) => element === joinCode)
            console.log("while loop", joinCode, matchingCode)

            if (matchingCode) {
                joinCode = ""
                matchingCode = ""
            } else {
                creatingCode = false
            }
        }

        const {
            rows: [household]
        } = await client.query(
            `
                INSERT INTO households(name, "joinCode")
                VALUES($1, $2)
                RETURNING *;
            `, [name, joinCode]
        )
        return household
    } catch (error) {
        throw error
    }
}

async function createUserHousehold ({ name }) {
    try {
        const {
            rows: [household]
        } = await client.query(
            `
                INSERT INTO households(name)
                VALUES($1)
                RETURNING *;
            `, [name]
        )
        return household
    } catch (error) {
        throw error
    }
}

async function updateHousehold (id, fields) {
    try {
        const toUpdate = {}
        for (let column in fields) {
            if (fields[column] !== undefined) {
                toUpdate[column] = fields[column]
            }
        }

        let household = {}

        if (util.dbFields(toUpdate).insert.length > 0) {
            const {
                rows: [updatedHousehold]
            } = await client.query(
                `
                    UPDATE households
                    SET ${util.dbFields(toUpdate).insert}
                    WHERE id = ${id}
                    RETURNING *;
                `, Object.values(toUpdate)
            )

            household = updatedHousehold
        }

        return household
    } catch (error) {
        throw error
    }
}

module.exports = { getHouseholdbyId, getHouseholdbyJoinCode, createUserHousehold, createSharedHousehold, updateHousehold }