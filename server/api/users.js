const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../secrets")
const SALT_ROUNDS = 10

router.use('/users')

const {
    createUser, 
    getAllUsers, 
    getUserbyUsername, 
    getUserbyId,
    getUserbyHouseholdId, 
    updateUser, 
    deleteUser
} = require("../helperFns/users")

// GET - /api/users - get all users
router.get("/", async (req, res, next) => {
    try {
        const users = await getAllUsers()
        res.send(users)
    } catch (error) {
        console.log("error from router get", error)
        next(error)
    }
})

//GET - /api/users/:id - get user by id
router.get('/:id', async (req, res, next) => {
    try {
        const user = await getUserbyId(req.params.id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

// GET - /api/users/household/:id - get users for a household
router.get("/household/:id", async (req, res, next) => {
    try {
        const users = await getUserbyHouseholdId(req.params.id)
        res.send(users)
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})

// PATCH - /api/users/:id - update user
router.patch('/:id', async (req, res, next) => {
    try {
        const user = await updateUser(req.params.id, req.body)
        res.send(user)
    } catch (error) {
        next(error)
    }
})

// POST - /api/users/register - create a new user
router.post("/register", async (req, res, next) => {
    try {
        const { name, username, password, defaultHouse } = req.body
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const user = await createUser({ name, username, password: hashedPassword, defaultHouse })
        delete user.password
        const token = jwt.sign(user, JWT_SECRET)

        res.cookie("token", token, {
            sameSite: "strict",
            httpOnly: true,
            signed: true,
        });
        delete user.password
        res.send({ token, user })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await getUserbyUsername(username)
        const validPassword = await bcrypt.compare(password, user.password)
        if (validPassword) {
            const token = jwt.sign(user, JWT_SECRET)

            res.cookie("token", token, {
                sameSite: "strict",
                httpOnly: true,
                signed: true
            });
            delete user.password
            res.send({ token, user })
        }
    } catch (error) {
        console.log(error.message)
        next(error)
        // throw new Error(`failed to login: ${error.message}`)
    }
})

router.post("/logout", async (req, res, next) => {
    try {
        res.clearCookie("token", {
            sameSite: "strict",
            httpOnly: true,
            signed: true,
        })
        res.send({
            loggedIn: false,
            message: "Logged Out",
        })
    } catch (error) {
        next(error)
    }
})

//DELETE user -- !! do we need to send through TOKEN/LOGIN info to permission a delete !! 
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await deleteUser(req.params.id)
        res.send(user)
    } catch (err) {
        next(err)
    }
})

module.exports = router