'use strict'

const Crypto = require('crypto')
const config = require('../config')

module.exports = request => {
  let signature = request.headers['x-hub-signature'] || ''
  signature = signature.replace(/^sha1=/, '')
  let digest = Crypto.createHmac('sha1', config.GITHUB_WEBHOOK_SECRET).update(JSON.stringify(request.body)).digest('hex')

  return signature === digest
}
