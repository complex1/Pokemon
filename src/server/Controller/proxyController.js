const proxyService = require('../Service/proxyService')

const proxyController = {}

proxyController.proxyCall = (req, res) => {
  const body = req.body
  proxyService.proxyCall(body, data => {
    res.send(data)
  })
}

module.exports = proxyController
