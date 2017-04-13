'use strict'

const axios = require('axios')
const buildPayload = require('./build-payload')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    if (data.action === 'closed' && data.merged === true) {
      const payload = await buildPayload(data)

      axios.defaults.headers.common['Authorization'] = payload.headers.authorization
      axios.defaults.headers.common['User-Agent'] = payload.headers.userAgent
      axios.defaults.headers.common['Accept'] = payload.headers.accept

      axios.put(payload.url, payload.data)
        .then(result => resolve({action: 'updated', success: true, response: result.data}))
        .catch(error => reject(error))
    } else {
      resolve({action: 'nothing'})
    }
  })
}
