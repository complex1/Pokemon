const Socekt = require('../Socket');
const Chat = require('../Model/chat');
const chatService = {}

chatService.getSummaryChat = (user) => {
    const chat = new Chat();
    return  new Promise((resolve, reject) => {
        chat.getSummaryChat(user.email).then(result => {
            const chatList = {}
            result.forEach(row => {
                const toUserEmail = row.to_user;
                const fromUserEmail = row.from_user;
                const send = fromUserEmail === user.email
                const userName = send ? toUserEmail : fromUserEmail;
                if (!chatList[userName]) {
                    chatList[userName] = {}
                }
                chatList[userName].name = send ? row.from_user_name : row.to_user_name;
                chatList[userName].isOnline = Socekt.isOnline(userName);
                chatList[userName].msg = [row];
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


module.exports = chatService