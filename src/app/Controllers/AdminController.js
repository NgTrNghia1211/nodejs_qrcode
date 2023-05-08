const Product = require('../Model/Products');
const { multipleMongooseToObject } = require('../../util/mongoose');

class ProductController {
    // ?[GET] /ad/stored/products
    storedProducts(req, res, next) {
        /* let perPage = 3;
        let page = req.params.page || 1;
        let startItem = 1 + (page -1) * perPage;
        Product
            .find() // find tất cả các data
            .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec((err, products) => {
                Product.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    console.log(res.locals.curUser);
                    res.render('ad/stored-products', {
                        products: multipleMongooseToObject(products),
                        curUser: res.locals.curUser,
                        PageInfo: {
                            startItem: startItem,
                            maxPage: Math.ceil(count/perPage)
                        }
                    })
                });
            }); */
        console.log(res.locals.curUser);
        Product.find({})
            .then(products => res.render('ad/stored-products', {
                products: multipleMongooseToObject(products),
                curUser: res.locals.curUser
            }))
            .catch(next)
    }
}

module.exports = new ProductController;