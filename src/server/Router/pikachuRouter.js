const express = require('express');
const router = express.Router();
const routerConfig = require('../Config/routes');
const pikachuController = require('../Controller/pikachuController');
const authMiddleware = require('../Middleware/authMiddleware');

router.get(routerConfig.pikachu.getFolders, authMiddleware, pikachuController.getFolders);
router.post(routerConfig.pikachu.createFolder, authMiddleware, pikachuController.addFolder);
router.delete(routerConfig.pikachu.deleteFolder, authMiddleware, pikachuController.deleteFolder);
router.get(routerConfig.pikachu.getServers, authMiddleware, pikachuController.getServers);
router.post(routerConfig.pikachu.createServer, authMiddleware, pikachuController.addServer);
router.delete(routerConfig.pikachu.deleteServer, authMiddleware, pikachuController.deleteServer);
router.put(routerConfig.pikachu.updateServer, authMiddleware, pikachuController.updateServer);
module.exports = router;
