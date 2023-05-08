var express = require('express');
const route = require('.');
var router = express.Router();

const { verifyToken, checkUser } = require('../app/Middleware/AuthMiddleware');
const productController = require('../app/Controllers/ProductController');
const loginController = require('../app/Controllers/LoginController');


/* newsController.index() */
router.get('*', checkUser);

//!  [GET] /products/create => render view of create view
router.get('/create', verifyToken, productController.create);

//! [POST] /products/create => send request to create a product
router.post('/store', productController.store);

//! [GET] /products/id/edit => edit a product
router.get('/:id/edit', verifyToken, productController.edit);
//! [PUT] /products/id => update a product
router.put('/:id', verifyToken, productController.update);

//! [DEL] /products/id => delete a product 
router.delete('/:id', verifyToken, productController.destroy);   

//! get information about a product by id
/* router.get('/getByID/:id', productController.showByID); */

//! [GET] /products/slug => retrieve data of a product
router.get('/:slug', productController.show);


module.exports = router;