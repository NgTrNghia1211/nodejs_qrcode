const Product = require('../Model/Products');
const { multipleMongooseToObject } = require('../../util/mongoose');

class InfoController {
    // ?[GET] /
    index(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('home', {
                    products: multipleMongooseToObject(products),
                })
            })
            .catch(next)
    }
}

module.exports = new InfoController;