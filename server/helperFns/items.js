const client = require('../client')
const util = require('../util')

const getAllItems = async () => {
    try {
        const { rows }
            = await client.query(`
        SELECT * 
        FROM items 
        ORDER BY category;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getItemById = async (id) => {
    try {
        const {
            rows: [item]
        } = await client.query(
            `
            SELECT * 
            FROM items
            WHERE id = $1;
            `,
            [id]
        )
        return item
    } catch (error) {
        throw error
    }
}

const getItemsByUser = async (ownerId) => {
    try {
        const { rows }
            = await client.query(`
        SELECT * 
        FROM items
        WHERE "onwerId" = $1
        ORDER BY category;
        `, [ownerId]
        )
        return rows
    } catch (error) {
        throw error
    }
}

const getItemsByHousehold = async (householdId) => {
    try {
        const { rows }
            = await client.query(`
        SELECT * 
        FROM items
        WHERE "householdId" = $1
        ORDER BY category;
        `, [householdId]
            )
        return rows
    } catch (error) {
        throw error
    }
}

const createItem = async ({ name, inPantry, sharing, category, expiry, ownerId, householdId }) => {
    try {
        const {
            rows: [item]
        } = await client.query(
            `
            INSERT INTO items(name, "inPantry", sharing, category, expiry, "ownerId", "householdId")
            VALUES($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *;
            `,
            [name, inPantry, sharing, category, expiry, ownerId, householdId]
        )
        return item
    } catch (error) {
        throw error
    }
}

const updateItem = async (id, fields) => {
    try {
        const toUpdate = {}
        for (let column in fields) {
            if (fields[column] !== undefined) toUpdate[column] = fields[column];
        }
        let item;
        if (util.dbFields(toUpdate).insert.length > 0) {
            const { rows } = await client.query(`
            UPDATE item
            SET ${util.dbFields(toUpdate).insert}
            WHERE id = ${id}
            RETURNING *;
            `, Object.values(toUpdate))
            item = rows[0]
        }
        return item;
    } catch (error) {
        throw error
    }
}

async function deleteItem(id) {
    try {
        const {rows } = await client.query(
            ` DELETE FROM items
            WHERE id=$1
            RETURNING *;
            `, [id])
            return rows[0]
    } catch (error) {
        throw error
    }
}

module.exports = {getAllItems, getItemById, getItemsByHousehold, getItemsByUser, createItem, updateItem, deleteItem}