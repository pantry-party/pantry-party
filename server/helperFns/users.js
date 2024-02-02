const client = require('../client')

const createUser = async ({ name, username, password, defaultHouse }) => {
    try {
        const {
            rows: [users],
        } = await client.query(
            `
                INSERT INTO users(name, username, password, "defaultHouse")
                VALUES($1, $2, $3, $4)
                RETURNING *;
            `,
            [name, username, password, defaultHouse]
        )
        return users
    } catch (error) {
        throw error
    }
}

const getAllUsers = async () => {
    try {
        const { rows }
            = await client.query(`
            SELECT *
            FROM users;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getUserbyUsername = async (username) => {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
      SELECT * 
      FROM users
      WHERE username = '${username}';
      `
        )
        return user
    }
    catch (error) {
        console.error("error logging in: ", error)
        throw new Error(`failed to login: ${error.message}`)
    }
}

const getUserbyId = async (userid) => {
    try {
        const {
            rows: [user]
        } = await client.query(
            `
                SELECT *
                FROM users
                WHERE id =${userid};
            `
        )
        return user
    } catch (error) {
        throw error
    }
}

const getUserbyHouseholdId = async (householdId) => {
    try {
        const { rows }
            = await client.query(
                `
      SELECT id, name, color
      FROM users
      WHERE "sharedHouse" = '${householdId}'
      ORDER BY name asc;
      `
            )
        return rows
    }
    catch (error) {
        throw error
    }
}

const updateUser = async (userId, fields = {}) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ')
    if (setString.length === 0) {
        return
    }
    try {
        const { rows: [users] } = await client.query(`
            UPDATE users
            SET ${setString}
            WHERE id=${userId}
            RETURNING *;
        `, Object.values(fields))
        return users
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (userId) => {
    try {
        const { rows } = await client.query(
            `
        DELETE FROM users
        WHERE id=$1 
        RETURNING *
        `, [userId]);
        return rows[0];
    } catch (err) {
        throw err
    }
}

module.exports = { createUser, getAllUsers, getUserbyUsername, getUserbyId, getUserbyHouseholdId, updateUser, deleteUser }