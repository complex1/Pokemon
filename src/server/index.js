require('dotenv').config();
require('./Model').init();

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { RequestLogger } = require('./log');
const proxyMiddleware = require('./Middleware/proxyMiddleware');
const routerConfig = require('./Config/routes');
const config = require('../config.json');

// Routes
const userRouter = require('./Router/userRouter');

server = express();

server.use(express.json())
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, '..', 'client', 'views'))
server.use(express.static(path.join(__dirname, '..', 'client', 'static')))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())
// server.use(RequestLogger);

server.use(routerConfig.user.basePath, userRouter);

server.use('/', proxyMiddleware);


server.listen(config.dev.PORT, () => {
    console.log('Server started on port 3000');
});