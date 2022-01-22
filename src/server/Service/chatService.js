const Socekt = require('../Socket/serverEvents');
const Chat = require('../Model/chat');
const chatService = {}

chatService.getSummaryChat = (user) => {
    const chat = new Chat();
    return  new Promise((resolve, reject) => {
        chat.getSummaryChat(user.email).then(result => {
            const chatList = {}
            result.forEach(row => {
                if (!(row.from_user in chatList) && !(row.to_user in chatList)) {
                    const from = row.from_user;
                    const to = row.to_user;
                    const userEmail = user.email
                    const self = from === userEmail
                    const targetEmail = self ? to : from;
                    const targetName = self ? row.to_user_name : row.from_user_name;
                    chatList[self ? to : from] = {
                        name: targetName,
                        msg: [row],
                        isOnline: Socekt.isOnline(targetEmail)
                    }
                }
            });
            resolve(chatList)
        }).catch(err => {
            reject(err);
        });
    });
}

chatService.getChat = (fromUser, toUser) => {
    const chat = new Chat(fromUser, '', toUser, '', '');
    return new Promise((resolve, reject) => {
        chat.getChat().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

chatService.sendMessage = (fromUser, toUser, message) => {
    const chat = new Chat(fromUser.email, fromUser.username, toUser.email, toUser.name, message);
    return new Promise((resolve, reject) => {
        chat.addChat().then(result => {
            Socekt.pushData('chat', toUser.email, result);
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}


module.exports = chatService