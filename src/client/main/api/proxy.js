import http from './http'
import config from './config'

export default {
  proxyCall (body, onSuccess, onError) {
    http.post(config.proxy.call, onSuccess, onError, body)
  }
}