'use strict'

const config = require('../config')
const buildPackage = require('./build-package')

module.exports = async data => {
  const auth = 'Basic ' + Buffer.from(config.GITHUB_USER + ':' + config.GITHUB_TOKEN).toString('base64')
  const pkg = await buildPackage(data)
  return {
    headers: {
      authorization: auth,
      userAgent: config.GITHUB_USER,
      accept: 'application/vnd.github.v3+json'
    },
    data: pkg,
    url: data.pkgUrlContent
  }
}
