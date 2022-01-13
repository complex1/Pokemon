
const { appLog } = require('../log');
const clientEvents = require('./clientEvents');
const serverEvents = require('../Socket/serverEvents');
module.exports = {
    socketUserMap: new Map(),
    init: function (server) {
        const io = require('socket.io')(server);
        io.on('connection', (socket) => {
            clientEvents.init(io, socket, this.socketUserMap);
            serverEvents.init(io, this.socketUserMap);
        });
    }
}