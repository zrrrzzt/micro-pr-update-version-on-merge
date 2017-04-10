'use strict'

const axios = require('axios')

module.exports = url => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
  })
}
