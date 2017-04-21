'use strict'

const semver = require('semver')
const getPkg = require('./get-pkg')

module.exports = async data => {
  let pkg = data.pkg
  const version = semver.inc(pkg.version, 'patch')
  pkg.version = version

  const content = Buffer.from(JSON.stringify(pkg, null, 2)).toString('base64')

  const original = await getPkg(data.pkgUrlContent)

  return {
    path: 'package.json',
    message: `Updates version - ${version}`,
    content: content,
    sha: original.sha
  }
}
