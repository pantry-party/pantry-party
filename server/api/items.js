const express = require('express');
const util = require('../helperFns/util.js')
const router = express.Router()
const {getAllItems, getItemById, getItemsByHousehold, getItemsByHouseholdPantry, getItemsByHouseholdGroceryList, getItemsByUser, createItem, updateItem, deleteItem} = require ('../helperFns/items.js')

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

router.get('/owner/:id', async (req, res, next) => {
    try {
        const items = await getItemsByUser(req.params.id)
        res.send(items)
    } catch (error) {
        next (error)
    }
})

router.get('/household/:id', async (req, res, next) => {
    try {
        const items = await getItemsByHousehold(req.params.id)
        res.send(items)
    } catch (error) {
        next (error)
    }
})

router.get('/household/:id/pantry', async (req, res, next) => {
    try {
        const items = await getItemsByHouseholdPantry(req.params.id)
        res.send(items)
    } catch (error) {
        next (error)
    }
})

router.get('/household/:id/grocerylist', async (req, res, next) => {
    try {
        const items = await getItemsByHouseholdGroceryList(req.params.id)
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

router.patch('/:id', async (req, res, next) => {
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