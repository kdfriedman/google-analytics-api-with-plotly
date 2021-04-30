const controllers = require('../controllers/successController');
const { handleAuthSuccess } = controllers;
const express = require('express');

/* ROUTES */

// creating and mounting a router
// the express.Router() is REAL middleware

const router = express.Router();

// this becomes the root of the defined router middleware
router.route('/').get(handleAuthSuccess);

module.exports = router;
