require('dotenv').config();
require('./Model').init();

const express = require('express');
const {graphqlHTTP} = require('express-graphql')
const graphql = require('graphql')
const cookieParser = require('cookie-parser');
const path = require('path');

const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      hello: {
        type: graphql.GraphQLString,
        args: {
            name: {
                type: graphql.GraphQLString
            }
        },
        resolve: (_, args) => "Hello world!" + args.name
      }
    })
  })
  const schema = new graphql.GraphQLSchema({ query: QueryRoot });


// Middleware
const proxyMiddleware = require('./Middleware/proxyMiddleware');
const { requestLogger } = require('./log');


// Configs
const routerConfig = require('./Config/routes');
const config = require('../config.json');

// Routes
const userRouter = require('./Router/userRouter');
const chatRouter = require('./Router/chatRouter');
const socket = require('./Socket/index');

const server = express();

server.use(express.json())
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, '..', 'client', 'views'))
server.use(express.static(path.join(__dirname, '..', 'client', 'static')))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())



// Routers
server.use(routerConfig.user.basePath, requestLogger, userRouter);
server.use(routerConfig.chat.basePath, requestLogger, chatRouter);
server.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));
server.get('/*', proxyMiddleware);


const appServer = server.listen(config.dev.PORT, () => {
    console.log('Server started on port ' + config.dev.PORT);
});

// socket.io
socket.init(appServer);