const express = require('express');
const router = express.Router();
const routerConfig = require('../Config/routes');
const chatController = require('../Controller/chatController');
const authMiddleware = require('../Middleware/authMiddleware');

router.get(routerConfig.chat.isOnline, authMiddleware, chatController.isOnline);
router.get(routerConfig.chat.getSummaryChat, authMiddleware, chatController.getSummaryChat);
router.get(routerConfig.chat.getChat, authMiddleware, chatController.getChat);
router.post(routerConfig.chat.sendMessage, authMiddleware, chatController.sendMessage);
module.exports = router;