const express = require('express')
const router = express.Router()
const { getHouseholdbyId, getHouseholdbyJoinCode, createUserHousehold, createSharedHousehold, updateHousehold } = require('../helperFns/households')
const { getUserbyHouseholdId } = require('../helperFns/users')

router.get('/id/:id', async (req, res, next) => {
    try {
        const household = await getHouseholdbyId(req.params.id)
        if (household.joinCode){
            household.users = await getUserbyHouseholdId(req.params.id)
        }

        res.send(household)
    } catch (error) {
        next(error)
    }
})

router.get('/join/:joinCode', async (req, res, next) => {
    try {
        const household = await getHouseholdbyJoinCode(req.params.joinCode)
        
        res.send(household)
    } catch (error) {
        next(error)
    }
})

router.post('/user', async (req, res, next) => {
    try {
        const { name } = req.body

        const household = await createUserHousehold({ name })

        res.send(household)
    } catch (error) {
        next(error)
    }
})

router.post('/shared', async (req, res, next) => {
    try {
        const { name } = req.body

        const household = await createSharedHousehold({ name })

        res.send(household)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const household = await updateHousehold(req.params.id, req.body)
        if (household.joinCode){
            household.users = await getUserbyHouseholdId(req.params.id)
        }
        res.send(household)
    } catch (error) {
        next(error)
    }
})

module.exports = router