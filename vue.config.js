const path = require("path")
module.exports = {
  configureWebpack: {
    entry: path.resolve(__dirname, 'client/main/main.js'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'client/main/'),
        'main': path.resolve(__dirname, 'client/main'),
        '@image': path.resolve(__dirname, 'client/static/images'),
        '@var': path.resolve(__dirname, 'client/static/scss/vars.scss')
      }
    }
  }
}
