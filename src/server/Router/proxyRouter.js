const express = require('express');
const router = express.Router();
const routerConfig = require('../Config/routes');
const proxyController = require('../Controller/proxyController');
const authMiddleware = require('../Middleware/authMiddleware');

router.post(routerConfig.proxy.proxyCall, authMiddleware, proxyController.proxyCall)

module.exports = router
