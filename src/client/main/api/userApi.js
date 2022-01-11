import http from './http'
import config from './config'

export default {
    getUserDetails(onSuccess, onError) {
        http.get(config.user.getUserDetails, onSuccess, onError)
    }
}