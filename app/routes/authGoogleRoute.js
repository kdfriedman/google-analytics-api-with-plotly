const controllers = require('../controllers/authGoogleController');
const { authenticateGoogle } = controllers;
const express = require('express');

/* ROUTES */

// creating and mounting a router
// the express.Router() is REAL middleware

const router = express.Router();

// this becomes the root of the defined router middleware
router.route('/').get(authenticateGoogle);

module.exports = router;
