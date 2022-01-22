export default {
    user: {
        getUserDetails: '/user/getuser',
        searchUser: '/user/search?q='
    },
    chat: {
        getChatSummary: '/chat/getsummarychat',
        getChat: '/chat/getchat?to=',
        isOnline: '/chat/isOnline?to=',
        sendMessage: '/chat/sendmessage'
    },
}