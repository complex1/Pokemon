//more options here - https://github.com/villadora/express-bunyan-logger#usage
const RequestLogger = require('express-bunyan-logger')({
    name: 'logger',
    format: ":remote-address - :user-agent[major] custom logger",
    streams: [{
        level: 'info',
        stream: process.stdout
    }]
})

module.exports = {
    RequestLogger
}