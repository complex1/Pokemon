const chatService = require('../Service/chatService');
const socketServer = require('../Socket/serverEvents')
const chatController = {}

chatController.isOnline = (req, res) => {
    const userEmail = req.query.user
    res.send({
        hasError: false,
        data: socketServer.isOnline(userEmail)
    })
}

chatController.getSummaryChat = (req, res) => {
    const user = req.user;
    chatService.getSummaryChat(user).then(result => {
        res.send({
            hasError: false,
            data: result
        });
    }).catch(err => {
        res.send({
            hasError: true,
            message: err.message
        });
    })
}

chatController.getChat = (req, res) => {
    const fromUser = req.user.email;
    const toUser = req.query.to;
    chatService.getChat(fromUser, toUser).then(result => {
        res.send({
            hasError: false,
            data: result || []
        });
    }).catch(err => {
        res.send({
            hasError: true,
            message: err.message
        });
    })
}

chatController.sendMessage = (req, res) => {
    const fromUser = req.user;
    const toUser = req.body.to;
    const message = req.body.message;
    chatService.sendMessage(fromUser, toUser, message).then(result => {
        res.send({ 
            hasError: false,
            data: result
        });
    }).catch(err => {
        res.send({
            hasError: true,
            message: err.message
        });
    })
}




module.exports = chatController