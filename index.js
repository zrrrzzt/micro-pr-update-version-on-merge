'use strict'

const readFileSync = require('fs').readFileSync
const marked = require('marked')
const { json, send } = require('micro')
const repackData = require('./lib/repack-data')
const getPkg = require('./lib/get-pkg')
const updateVersion = require('./lib/update-version')

module.exports = async (request, response) => {
  if (request.method === 'POST') {
    let data = repackData(await json(request))
    const pkg = await getPkg(data.pkgUrlRaw)
    data.pkg = pkg

    const updates = await updateVersion(data)
    const result = {
      action: updates.action,
      data: data
    }
    send(response, 200, result)
  } else {
    const readme = readFileSync('./README.md', 'utf-8')
    const html = marked(readme)
    send(response, 200, html)
  }
}
