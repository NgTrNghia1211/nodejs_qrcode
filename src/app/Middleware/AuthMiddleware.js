const jwt = require('jsonwebtoken')

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

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = req.cookies.jwt;

    if (!token) {
        return res.render('error/error', {
          statusCode: 401,
          message: 'Your unauthenticated access to this content',
          toDo: 'Please login first',
          action: 'Return to login page',
          url: '/login'
        });
    } 

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        console.log(decoded);
        return next();
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
          if (err) {
            res.locals.curUser = null;
            next();
          } else {
            let user = {
              decodedToken,
              name1 : decodedToken.username
            }
            res.locals.curUser = user;
            next();
          }
        });
      } else {
        res.locals.curUser = null;
        next();
      }
}

module.exports = { verifyToken, checkUser };