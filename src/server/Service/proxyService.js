const axios = require('axios').default
const proxyService = {}

class ResponseBody {
  constructor () {
    this.duration = 0
    this.error = false
    this.errorMessage = ''
    this.responseBody = {}
    this.responseHeader = {}
    this.requestConfig = {}
    this.statusCode = ''
  }
  setErrorMessage (msgObj) {
    this.errorMessage = msgObj
  } 
}

const httpRequest = (config, cb) => {
  console.log('PROXY REQUEST', config)
  const responseDao = new ResponseBody()
  const startTime = new Date().valueOf()
  axios(config).then(res => {
    console.log('PROXY RESPONSE::SUCCESS', res.data)
    const endTime = new Date().valueOf()
    responseDao.duration = endTime - startTime
    responseDao.responseBody = res.data
    responseDao.responseHeader = res.headers
    responseDao.statusCode = res.statusCode
    responseDao.requestConfig = config
    cb(responseDao)
  }).catch(err => {
    console.log('PROXY RESPONSE::ERROR', err)
    const endTime = new Date().valueOf()
    responseDao.duration = endTime - startTime
    responseDao.error = true
    responseDao.setErrorMessage({message: err.message, errorObj: err.response && err.response.data})
    responseDao.requestConfig = config
    cb(responseDao)
  })
}

proxyService.proxyCall = (config, cb) => {

  let fullUrl = config.proto + (config.baseUrl + config.url).replace(/\/+/gm, '/')
  const matchList = fullUrl.match(/{.*?}/gi) || []

  matchList.forEach(key => {
    const value = config.params[key.slice(1, -1).trim()]
    fullUrl = fullUrl.replace(key, value)
  })

  let pathVariable = ''
  const querys = config.query || {}
  Object.keys(querys).forEach((value, index, arr) => {
    if (index === 0) {
      pathVariable += '?' 
    }
    pathVariable += `${value}=${querys[value]}`
    if (index !== arr.length - 1) {
      pathVariable += '&'
    }
  })

  fullUrl += pathVariable
  
  const requestBody = {}
  requestBody.url = fullUrl
  requestBody.method = config.method || 'GET'
  requestBody.headers = config.headers || {}
  if (typeof config.body === 'object' && requestBody.method !== 'GET') {
    requestBody.headers['Content-type'] = 'application/json'
  }
  if (requestBody.method !== 'GET') {
    requestBody.data = config.body
  }
  httpRequest(requestBody, cb)
}

module.exports = proxyService
