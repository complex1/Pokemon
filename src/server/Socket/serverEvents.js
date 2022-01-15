let socketUserMap = new Map();
let io = null
module.exports = {
    init (_io, _socketUserMap) {
        io = _io;
        socketUserMap = _socketUserMap;
    },
    pushData: (event, email, data) => {
        if (socketUserMap.has(email)) {
            const sockets = socketUserMap.get(email);
            sockets.forEach(socketId => {
                io.to(socketId).emit(event, data);
            });
        }
    },
    pushDataToEmails (event, emails, data) {
        emails.forEach(email => {
            if (socketUserMap.has(email)) {
                const sockets = socketUserMap.get(email);
                sockets.forEach(socketId => {
                    io.to(socketId).emit(event, data);
                });
            }
        });
    },
    pushDataToAll: (event, data) => {
        io.emit(event, data);
    },
    isOnline (email) {
        return socketUserMap.has(email);
    }
}