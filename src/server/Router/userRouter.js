const express = require('express');
const router = express.Router();
const routerConfig = require('../Config/routes');
const userController = require('../Controller/userController');

router.get(routerConfig.user.login, userController.renderLogin);
router.get(routerConfig.user.register, userController.renderRegister);
router.post(routerConfig.user.login, userController.login);
router.post(routerConfig.user.register, userController.register);

module.exports = router;