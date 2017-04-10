'use strict'

module.exports = data => {
  return {
    action: data.action,
    title: data.pull_request.title,
    user: data.pull_request.user.login,
    merged: data.pull_request.merged,
    pkgUrlRaw: `https://raw.githubusercontent.com/${data.repository.full_name}/master/package.json`,
    pkgUrlContent: data.repository.contents_url.replace('{+path}', 'package.json')
  }
}
