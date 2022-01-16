import http from './http'
import config from './config'

export default {
    getChatSummary(onSuccess, onError) {
        http.get(config.chat.getChatSummary, onSuccess, onError)
    }
}