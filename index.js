'use strict'

const fetcher = require('./utils/fetch.js')
const db = require('./utils/db.js')
const helper = require('./utils/gen.js')

const makeRequest = async () => {
  try {
    const date = helper.createDate()
    await db.checkDate(date)
    const summary = await fetcher.fetchWaka(date)
    console.info('Summary successfully fetched')
    await db.storeSummary(summary)
    console.timeEnd('waka-fetch')
    return 'Summary successfully stored'
  } catch (err) {
    return err
  }
}

module.exports = (req, res) => {
  console.time('waka-fetch')
  if (process.env.NODE_ENV === 'production' && req.headers.authorization !== process.env.WAKA_FETCH_AUTH) {
    res.end('Authentication required.')
  } else {
    makeRequest()
      .then(r => {
        if (process.env.NODE_ENV === 'production') {
          console.info(r)
          res.end(r)
        } else {
          console.info(r) 
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
}
