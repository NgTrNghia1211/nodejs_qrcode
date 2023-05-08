require('dotenv').config();

const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');

const users = [
    {
        id: 1,
        name: 'user1',
        password: '123456'
    },
    {
        id: 2,
        name: 'user2',
        password: '234567'
    }
]

class loginMiddleware {
    // ?[GET] /login => render login page
    login(req, res, next) {
        res.render("login/login")
    }

    // ?[POST] /login => send request to login
    checkLogin(req, res, next) {        
        const username = req.body.name;
        const password = req.body.password;
        const user = users.find(user => user.name === username && user.password === password); 
        
        // ? If no user in database
        if (!user) {
            return res.render('error/error', {
                statusCode: 401,
                message: 'Your unauthenticated login',
                toDo: 'Check your username and password then log in again',
                action: 'Return to login page',
                url: '/login'
            });
        } 
        
        //? If yes
        const toCreateToken = {
            id: user.id,
            username: user.name
        }

        const accessToken = jwt.sign(toCreateToken, process.env.SECRET_KEY)
        res.cookie("jwt", accessToken);
        console.log({accessToken});
        res.redirect('/ad/stored/products');
    }

    //? [GET] /logout
    logout(req, res, next) {
        res.cookie('jwt', '');
        res.redirect('/');
    }
}

module.exports = new loginMiddleware;