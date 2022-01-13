let socketUserMap = new Map();
let io = null
module.exports = {
    init (_io, _socketUserMap) {
        io = _io;
        socketUserMap = _socketUserMap;
    },
    pushData: (email, data) => {
        if (socketUserMap.has(email)) {
            const sockets = socketUserMap.get(email);
            sockets.forEach(socketId => {
                io.to(socketId).emit('message', data);
            });
        }
    }
}