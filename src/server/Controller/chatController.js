const chatService = require('../Service/chatService');
const chatController = {}

chatController.isOnline = (req, res) => {
    res.send('chatController.isOnline')
}

chatController.getSummaryChat = (req, res) => {
    const user = req.user;
    chatService.getSummaryChat(user).then(result => {
        res.send({
            status: true,
            data: result
        });
    }).catch(err => {
        res.send(err);
    })
}

module.exports = chatController