'use strict'

const readFileSync = require('fs').readFileSync
const md = require('markdown-it')()
const { json, send } = require('micro')
const repackData = require('./lib/repack-data')
const getPkg = require('./lib/get-pkg')
const updateVersion = require('./lib/update-version')
const validatePayload = require('./lib/validate-payload')

module.exports = async (request, response) => {
  if (request.method === 'POST') {
    const headers = request.headers
    const payload = await json(request)
    const isValid = validatePayload({headers: headers, body: payload})

    if (isValid === true) {
      try {
        let data = repackData(payload)
        const pkg = await getPkg(data.pkgUrlRaw)
        data.pkg = pkg

        const updates = await updateVersion(data)
        const result = {
          action: updates.action,
          data: data
        }
        send(response, 200, result)
      } catch (error) {
        console.error(error)
        send(response, 500, {success: false, error: error.message})
      }
    } else {
      send(response, 401, 'invalid signature')
    }
  } else {
    const readme = readFileSync('./README.md', 'utf-8')
    send(response, 200, md.render(readme))
  }
}
