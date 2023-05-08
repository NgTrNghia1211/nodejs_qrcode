var express = require('express');
const route = require('.');
var router = express.Router();

const infoController = require('../app/Controllers/InfoController');
const {checkUser} = require('../app/Middleware/AuthMiddleware');

/* newsController.index() */

router.get('/', checkUser, infoController.index);

module.exports = router;