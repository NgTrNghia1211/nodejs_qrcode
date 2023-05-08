require('dotenv').config

var express = require('express');
const route = require('.');
var router = express.Router();
const jwt = require('jsonwebtoken');

const loginController = require('../app/Controllers/LoginController');

/* newsController.index() */

// ! GET LOGIN PAGE (FE)
router.get('/', loginController.login);

// ! POST LOGIN
router.post('/',loginController.checkLogin);

module.exports = router;