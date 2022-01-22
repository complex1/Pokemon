const jwt = require('jsonwebtoken');
const userService = require('../Service/userService');
const routerConfig = require('../Config/routes');
const TOKEN_KEY = process.env.JWT_PRIVATE_KEY;
const userController = {}

userController.renderLogin = (req, res) => {
    res.render('login');
}

userController.renderRegister = (req, res) => {
    res.render('register');
}

userController.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    userService.authenticate(username, password)
        .then((user) => {
            const token = jwt.sign({ username: user.username, id: user.id, email: user.email }, TOKEN_KEY)
            res.cookie('POKEMON_AUTH_TOKEN', token)
                .send({
                    hasError: false,
                    redirect: routerConfig.user.home
                });
        }).catch((err) => {
            res.send({
                hasError: true,
                error: err.message
            });
        }
        );
}

userController.register = (req, res) => {
    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    userService.register(name, email, password)
        .then(() => {
            res.send({
                hasError: false,
                redirect: routerConfig.user.basePath + routerConfig.user.login
            });
        }).catch((err) => {
            res.send({
                hasError: true,
                message: err.message
            });
        }
        );
}

userController.getUser = (req, res) => {
    const user = req.user;
    userService.getUser(user.id)
        .then((user) => {
            if (user) {
                res.send({
                    hasError: false,
                    data: user
                });
            } else {
                res.send({
                    hasError: true,
                    message: 'User not found'
                });
            }
        }).catch((err) => {
            res.send({
                hasError: true,
                message: err.message
            });
        })
}

userController.search = (req, res) => {
    const keyword = req.query.q;
    const email = req.user.email;
    userService.search(keyword, email)
        .then((user) => {
            if (user) {
                res.send({
                    hasError: false,
                    data: user
                });
            } else {
                res.send({
                    hasError: true,
                    message: 'User not found'
                });
            }
        }).catch((err) => {
            res.send({
                hasError: true,
                message: err.message
            });
        })
}

module.exports = userController;
