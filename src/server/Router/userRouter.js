const express = require('express');
const router = express.Router();
const routerConfig = require('../Config/routes');
const userController = require('../Controller/userController');
const authMiddleware = require('../Middleware/authMiddleware');


router.get(routerConfig.user.login, userController.renderLogin);
router.get(routerConfig.user.register, userController.renderRegister);
router.post(routerConfig.user.login, userController.login);
router.post(routerConfig.user.register, userController.register);
router.get(routerConfig.user.getUser, authMiddleware, userController.getUser);
router.get(routerConfig.user.search, authMiddleware, userController.search);

module.exports = router;