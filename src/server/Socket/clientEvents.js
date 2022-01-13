const { appLog } = require('../log');
const { getToken } = require('../Utils/socket');
const jwt = require('jsonwebtoken');

const addUserToSocketMap = (socketUserMap, email, id) => {
    if (!socketUserMap.has(email)) {
        socketUserMap.set(email, []);
    }
    socketUserMap.get(email).push(id);
}

const removeUserFromSocketMap = (socketUserMap, email, id) => {
    if (socketUserMap.has(email)) {
        socketUserMap.get(email).splice(socketUserMap.get(email).indexOf(id), 1);
    }
    if (socketUserMap.get(email).length === 0) {
        socketUserMap.delete(email);
    }
}

module.exports = {
    init (io, socket, socketUserMap) {
        const token = getToken(socket);
        const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        addUserToSocketMap(socketUserMap, user.email, socket.id);
        appLog(user.email + ' connected with ws');
        appLog(socketUserMap);

        socket.on('disconnect', () => {
            removeUserFromSocketMap(socketUserMap, user.email, socket.id);
            appLog(user.email + ' disconnected with ws');
        });
    }
}