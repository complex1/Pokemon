const express = require('express');
const router = express.Router();
const routerConfig = require('../Config/routes');
const chatController = require('../Controller/chatController');
const authMiddleware = require('../Middleware/authMiddleware');

router.get(routerConfig.chat.isOnline, authMiddleware, chatController.isOnline);
router.get(routerConfig.chat.getSummaryChat, authMiddleware, chatController.getSummaryChat);
module.exports = router;