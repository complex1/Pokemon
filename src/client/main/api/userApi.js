import http from './http'
import config from './config'

export default {
    getUserDetails(onSuccess, onError) {
        http.get(config.user.getUserDetails, onSuccess, onError)
    },
    searchUser(keyword, onSuccess, onError) {
        http.get(config.user.searchUser + keyword, onSuccess, onError)
    }
}