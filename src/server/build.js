require('dotenv').config();
require('./Model').init();

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');


// Middleware
// const proxyMiddleware = require('./Middleware/proxyMiddleware');
const { requestLogger } = require('./log');


// Configs
const routerConfig = require('./Config/routes');
const config = require('../config.json');

// Routes
const userRouter = require('./Router/userRouter');
const chatRouter = require('./Router/chatRouter');
const pikachuRouter = require('./Router/pikachuRouter');
const proxyRouter = require('./Router/proxyRouter')
const socket = require('./Socket/index');

const server = express();

server.use(express.json())
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, '..', '..', 'dist'))
server.use(express.static(path.join(__dirname, '..', '..', 'dist')))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())



// Routers
server.use(routerConfig.user.basePath, requestLogger, userRouter);
server.use(routerConfig.chat.basePath, requestLogger, chatRouter);
server.use(routerConfig.pikachu.basePath, requestLogger, pikachuRouter);
server.use(routerConfig.proxy.basePath, requestLogger, proxyRouter)
// server.get('/*', proxyMiddleware);

server.use(express.static(path.join(__dirname, '..', '..', 'dist')))

server.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'))
})

const appServer = server.listen(config.dev.PORT, () => {
    console.log('Server started on port ' + config.dev.PORT);
});

// socket.io
socket.init(appServer);