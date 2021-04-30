const controllers = require('../controllers/inspirationController');
const { getInspirationTemplate } = controllers;
const express = require('express');

/* ROUTES */

// creating and mounting a router
// the express.Router() is REAL middleware

const router = express.Router();

// this becomes the root of the defined router middleware
router.route('/').get(getInspirationTemplate);

module.exports = router;
