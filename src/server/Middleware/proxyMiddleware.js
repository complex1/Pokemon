const { createProxyMiddleware } = require('http-proxy-middleware')
const config = require('../../config.json');

var options = {
    target: `http://${config.dev.UI_HOST}:${config.dev.UI_PORT}`,
    changeOrigin: true
}

module.exports = createProxyMiddleware(options)