module.exports = {
    user: {
        basePath: '/user',
        login: '/login',
        register: '/register',
        home: '/',
        getUser: '/getuser',
        search: '/search',
    },
    chat: {
        basePath: '/chat',
        isOnline: '/isonline',
        getSummaryChat: '/getsummarychat',
        getChat: '/getchat',
        sendMessage: '/sendmessage',
    },
    pikachu: {
        basePath: '/api/swagger',
        createFolder: '/createfolder',
        getFolders: '/getfolders',
        deleteFolder: '/deletefolder/:folderId',
        createServer: '/createserver',
        getServers: '/getservers/:folderId',
        deleteServer: '/deleteserver/:serverId',
        updateServer: '/updateserver',
    },
    proxy: {
        basePath: '/proxy',
        proxyCall: '/proxy-call'
    },
    notes: {
        basePath: '/notes',
        addNote: '/addnote',
        updateNote: '/updatenote',
        deleteNote: '/deletenote',
        getNotes: '/getnotes',
    },
    task: {
        basePath: '/task',
        createNewTask: '/createtask'
    }

}