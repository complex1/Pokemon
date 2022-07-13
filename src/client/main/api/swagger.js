import http from './http'
import config from './config'

export default {
  getFolders(onSuccess, onError) {
    http.get(config.swagger.getFolders, onSuccess, onError)
  },
  addFolder(folder, onSuccess, onError) {
    http.post(config.swagger.addFolder, onSuccess, onError, { folderName: folder })
  },
  deleteFolder(folder, onSuccess, onError) {
    http.delete(config.swagger.deleteFolder + '/' + folder, onSuccess, onError)
  },
  getServers(projectId, onSuccess, onError) {
    http.get(config.swagger.getServers + '/' + projectId, onSuccess, onError)
  },
  addServer(body, onSuccess, onError) {
    http.post(config.swagger.addServer, onSuccess, onError, body)
  },
  deleteServer(serverId, onSuccess, onError) {
    http.delete(config.swagger.deleteServer + '/' + serverId, onSuccess, onError)
  }
}