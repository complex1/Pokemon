import http from './http'
import config from './config'

export default {
    getUserIsOnline (email, onSuccess, onError) {
        http.get(config.chat.isOnline + email, onSuccess, onError)
    },
    getChatSummary(onSuccess, onError) {
        http.get(config.chat.getChatSummary, onSuccess, onError)
    },
    getChat(to, onSuccess, onError) {
        http.get(config.chat.getChat + to, onSuccess, onError)
    },
    sendMessage(to, message, onSuccess, onError) {
        http.post(config.chat.sendMessage, onSuccess, onError, {to, message})
    }
}