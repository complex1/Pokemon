import swagger from "@/api/swagger"
import proxy from '@/api/proxy'
export default {
  namespaced: true,
  state: {
    servers: [],
    folders: [],
    openFolder: null,
    openServer: null,
    apiDoc: null,
    proxyPath: '/swagger/proxy',
    searchKeyword: ''
  },
  getters: {
  },
  mutations: {
    setServers(state, servers) {
      state.servers = servers
    },
    setFolders(state, folders) {
      state.folders = folders
    },
    setOpenFolder(state, folder) {
      state.openFolder = folder
    },
    setOpenServer (state, server) {
      state.openServer = server
    },
    setApiDoc (state, apiDoc) {
      state.apiDoc = apiDoc
    },
    setSearchKeyword (state, keyword) {
      state.searchKeyword = keyword
    }
  },
  actions: {
    getFolders({ commit }) {
      swagger.getFolders(response => {
        commit("setFolders", response.data)
      }, error => {
        console.log(error)
      })
    },
    addFolder({ dispatch }, folder) {
      swagger.addFolder(folder, () => {
        dispatch('getFolders')
      }, error => {
        console.log(error)
      })
    },
    deleteFolder({ dispatch }, folder) {
      swagger.deleteFolder(folder, () => {
        dispatch('getFolders')
      }, error => {
        console.log(error)
      })
    },
    getServers({ commit }, projectId) {
      commit('setOpenFolder', null)
      swagger.getServers(projectId, response => {
        commit("setServers", response.data.servers)
        commit('setOpenFolder', response.data.folder)

      }, error => {
        console.log(error)
      })
    },
    getServerApiDoc(_, { server, cb, fail }) {
      const data = {
        proto: server.proto,
        baseUrl: server.endpoint,
        url: server.docPath,
        method: 'GET',
        query: {},
        params: {},
        headers: {}
      }
      proxy.proxyCall(data, cb, fail)
    },
    saveServer ({ dispatch }, { data, cb }) {
      swagger.addServer(data, (res) => {
        dispatch('getServers', data.folderId)
        cb(res)
      }, (err) => {console.log(err)})
    },
    deleteServer ({ state, dispatch }, serverId ) {
      swagger.deleteServer(serverId, () => {
        dispatch('getServers', state.openFolder.id)
      }, (err) => {console.log(err)})
    },
    fetchAllServer({ commit }, {projectId, serverId}) {
      commit('setOpenFolder', null)
      commit('setOpenServer', null)
      swagger.getServers(projectId, response => {
        commit("setServers", response.data.servers)
        commit('setOpenFolder', response.data.folder)
        commit('setOpenServer', response.data.servers.find(e => e.id === serverId))
      }, error => {
        console.log(error)
      })
    },
  }
}
