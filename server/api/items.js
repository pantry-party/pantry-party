const express = require('express');
const util = require('util')
const router=express.Router()
const {getAllItems, getItembyId, getItemsByHousehold, getItemsbyUser, createItem, updateItem, deleteItem} = require ('../helperFns/items.js')

router.get('/', async(req, res, next) => {
    try {
        const items = await getAllItems()
        res.send(items)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const item = await getItemById(req.params.id)
        res.send(item)
    } catch (error) {
        next(error)
    }
})

router.get('/:ownerId', async (req, res, next) => {
    try {
        const items = await getItemsbyUser(req.params.id)
        res.send(items)
    } catch (error) {
        next (error)
    }
})

router.get('/:householdId', async (req, res, next) => {
    try {
        const items = await getItemsByHousehold(req.params.id)
        res.send(items)
    } catch (error) {
        next (error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const item = await createItem(req.body)
        res.send(item)
    } catch (error) {
        next (error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const item = await updateItem(req.params.id, req.body)
        res.send(item)
    } catch (error) {
        next (error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const item = await deleteItem(req.params.id)
        res.send(item)
    } catch (error) {
        next (error)
    }
})

module.exports = router