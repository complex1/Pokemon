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
    swagger: {
        getFolders: '/api/swagger/getfolders',
        addFolder: '/api/swagger/createfolder',
        deleteFolder: '/api/swagger/deletefolder',
        getServers: '/api/swagger/getservers',
        addServer: '/api/swagger/createserver',
        deleteServer: '/api/swagger/deleteserver',
        updateServer: '/api/swagger/updateserver',
    },
    proxy: {
        call: '/proxy/proxy-call'
    },
    notes: {
        getNotes: '/notes/getnotes',
        addNote: '/notes/addnote',
        deleteNote: '/notes/deletenote',
        updateNote: '/notes/updatenote'
    }
}