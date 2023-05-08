var express = require('express');
const route = require('.');
var router = express.Router();
const { verifyToken, checkUser } = require('../app/Middleware/AuthMiddleware');

const adminController = require('../app/Controllers/AdminController');

/* newsController.index() */

//! [GET] /ad/stored/products => link to render view listed all products
router.get('/stored/products', verifyToken, checkUser, adminController.storedProducts);
// router.get('/stored/products/:page', verifyToken, checkUser, adminController.storedProducts);

module.exports = router;