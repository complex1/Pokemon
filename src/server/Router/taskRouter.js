const express = require('express');
const router = express.Router();
const routerConfig = require('../Config/routes');
const taskController = require('../Controller/taskController');
const authMiddleware = require('../Middleware/authMiddleware');

router.post(routerConfig.task.createNewTask, authMiddleware, taskController.createNewTask);

module.exports = router