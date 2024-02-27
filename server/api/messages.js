const express = require('express')
const router = express.Router()
const { getHouseholdMessages, createMessage, deleteMessage, updateMessage } = require('../helperFns/messages')

router.get('/:id', async (req, res, next) => {
    try {
        const messages = await getHouseholdMessages(req.params.id)
        res.send(messages)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const message = await createMessage(req.body)
        res.send(message)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const message = await updateMessage(req.params.id, req.body)
        res.send(message)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const message = await deleteMessage(req.params.id)
        res.send(message)
    } catch (error) {
        next(error)
    }
})

module.exports = router