require('dotenv').config

var express = require('express');
const route = require('.');
var router = express.Router();
const jwt = require('jsonwebtoken');

const loginController = require('../app/Controllers/LoginController');

router.get('/', loginController.logout);

module.exports = router;