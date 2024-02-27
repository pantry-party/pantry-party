const client = require('../db/client')
const util = require('./util')

const getHouseholdMessages = async (id) => {
    try {
        const { rows } = await client.query(`
            SELECT messages.*, users.name, users.color, SUBSTRING(users.name, 1, 1) AS "userInitial"
            FROM messages
            INNER JOIN users ON messages."userId" = users.id
            WHERE "householdId" = $1
            ORDER BY date DESC
        `, [id])
        return rows
    } catch (error) {
        throw error
    }
}

const createMessage = async ({ content, userId, householdId, date }) => {
    try {
        const { rows: [message] } = await client.query(`
            INSERT INTO messages(content, "userId", "householdId", date)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [content, userId, householdId, date])
        return message
    } catch (error) {
        throw error
    }
}

const deleteMessage = async (id) => {
    try {
        const { rows: [message] } = await client.query(`
            DELETE FROM messages
            WHERE id = $1
            RETURNING *;
        `, [id])
        return message
    } catch (error) {
        throw error
    }
}

const updateMessage = async (id, fields) => {
    try {
        const toUpdate = {}
        for (let column in fields) {
            if (fields[column] !== undefined) toUpdate[column] = fields[column];
        }
        let message
        if (util.dbFields(toUpdate).insert.length > 0) {
            const { rows } = await client.query(`
            UPDATE messages
            SET ${util.dbFields(toUpdate).insert}
            WHERE id = ${id}
            RETURNING *;
            `, Object.values(toUpdate))
            message = rows[0]
        }
        return message
    } catch (error) {
        throw error
    }
}

module.exports = { getHouseholdMessages, createMessage, deleteMessage, updateMessage }