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
                WHERE id =${id};
            `
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
                WHERE joinCode =${joinCode};
            `
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
                INSERT INTO users(name)
                VALUES(${name});
                RETURNING *;
            `
        )
        return household
    } catch (error) {
        throw error
    }
}

async function createSharedHoushold ({ name }) {
    try {
        const {
            rows: [household]
        } = await client.query(
            `
                INSERT INTO users(name, "joinCode")
                VALUES(${name}, unique_random(6, 'households', 'joinCode'));
                RETURNING *;
            `
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

module.exports = { getHouseholdbyId, getHouseholdbyJoinCode, createUserHousehold, createSharedHoushold, updateHousehold }