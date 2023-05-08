const Product = require('../Model/Products');
const { mongooseToObject } = require('../../util/mongoose');

class ProductController {
    // ?[GET] /products/:slug (show by slug)
    show(req, res, next) {
        Product.findOne({slug: req.params.slug})
            .then((product) => {
                if (!product) {
                    return res.render('error/error', {
                        statusCode: 404,
                        message: 'Your content was not found',
                        toDo: 'Please check your access link again',
                        action: 'Return to homepage',
                        url: '/'
                    });
                };
                res.render('products/detail', {
                    product: mongooseToObject(product)
                })
            }) 
            .catch(next)
        }

    //? [GET] /products/getByID/:id
    showByID(req, res, next) {
        Product.findOne({_id: req.params.id})
            .then((product) => {
                res.render('products/detail', {
                    product: mongooseToObject(product)
                })
            }) 
            .catch(next)
    }

    // ?[GET] /products/create
    create(req, res, next) {
        res.render('products/create');
    }

    // ?[POST] /products/store
    store(req, res, next) {
        const product = new Product(req.body);
        product.save()
            .then(() => {
                res.redirect('/products/' + product.slug);
            })
            .catch(next)
    }

    //? [GET] /:id/edit
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then(product => res.render('products/edit',{
                product: mongooseToObject(product)
            }))
            .catch(next) 
    }

    //? [PUT] products/:id
    update(req, res, next) {
        var slug = ''
        
        Product.findById(req.params.id)
            .then((product) => {
                var prod = mongooseToObject(product);
                slug = prod.slug;
            } )
            .catch(next)
        Product.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/products/' + slug))
            .catch(next)
    }

    //? [DELETE] products/:id
    destroy(req, res, next) {
        console.log(req.params.id)
        Product.deleteOne({_id: req.params.id})
            .then(() => res.redirect('/ad/stored/products'))
            .catch(next)
    }

}

module.exports = new ProductController;