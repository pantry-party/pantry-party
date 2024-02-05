const client = require('../db/client')
const util = require('./util')

const getAllItems = async () => {
    try {
        const { rows }
            = await client.query(`
        SELECT items.*, users.color 
        FROM items 
        LEFT JOIN users ON items."ownerId" = users.id
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
            SELECT items.*, users.color
            FROM items
            LEFT JOIN users ON items."ownerId" = users.id
            WHERE items.id = $1;
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
        WHERE "ownerId"=$1
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
        SELECT items.*, users.color
        FROM items
        LEFT JOIN users ON items."ownerId" = users.id
        WHERE "householdId" = $1
        ORDER BY category;
        `, [householdId]
            )
        return rows
    } catch (error) {
        throw error
    }
}

const getItemsByHouseholdPantry = async (householdId) => {
    try {
        const { rows }
            = await client.query(`
        SELECT items.*, users.color
        FROM items
        LEFT JOIN users ON items."ownerId" = users.id
        WHERE "householdId" = $1 AND "inPantry" = true
        ORDER BY dateMoved, category;
        `, [householdId]
            )
        return rows
    } catch (error) {
        throw error
    }
}

const getItemsByHouseholdGroceryList = async (householdId) => {
    try {
        const { rows }
            = await client.query(`
        SELECT items.*, users.color, SUBSTRING(users.name, 1, 1) AS "userInitial"
        FROM items
        LEFT JOIN users ON items."ownerId" = users.id
        WHERE "householdId" = $1 AND "inPantry" = false
        ORDER BY category;
        `, [householdId]
            )
        return rows
    } catch (error) {
        throw error
    }
}

const createItem = async ({ name, dateMoved, inPantry, sharing, category, expiry, ownerId, householdId }) => {
    try {
        const {
            rows: [item]
        } = await client.query(
            `
            INSERT INTO items(name, "dateMoved", "inPantry", sharing, category, expiry, "ownerId", "householdId")
            VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *;
            `,
            [name, dateMoved, inPantry, sharing, category, expiry, ownerId, householdId]
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
            UPDATE items
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

module.exports = {getAllItems, getItemById, getItemsByHousehold, getItemsByHouseholdPantry, getItemsByHouseholdGroceryList, getItemsByUser, createItem, updateItem, deleteItem}