'use strict'

const fetcher = require('./utils/fetch.js')
const db = require('./utils/db.js')

const makeRequest = async () => {
  await fetcher.fetchWaka()
    .then(summary => {
      console.info('Summary successfully fetched')
      return db.storeSummary(summary)
    })
    .then(() => {
      console.info('Summary successfully stored') 
      console.timeEnd('waka-fetch')
    })
}

module.exports = (req, res) => {
  console.time('waka-fetch')
  makeRequest()
    .catch(err => {
      console.error(err)
    })
}
