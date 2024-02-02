const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', (req, res, next) => {
    res.send('OK');
});

// ROUTER: /api/households
// router.use('/households', require('./households'));

// ROUTER: /api/users
router.use('/users', require('./users'));

// ROUTER: /api/items
router.use('/items', require('./items'));

module.exports = router;