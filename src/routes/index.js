const infoRouter = require('./info');
const listedRouter = require('./listed_product');
const productRouter = require('./detail_product');
const logoutRouter = require('./logout');
const loginRouter = require('./authentication');

function route(app) {
    app.use('/', infoRouter);
    app.use('/ad', listedRouter);
    app.use('/products', productRouter)
    app.use('/login', loginRouter);
    app.use('/logout', logoutRouter);
}

module.exports = route;
