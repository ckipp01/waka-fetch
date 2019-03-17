'use strict'

const { fetchWaka }= require('./utils/fetch.js')
const { checkDate, storeSummary } = require('./utils/db.js')
const { createDate } = require('./utils/gen.js')

const makeRequest = async () => {
  try {
    const date = createDate()
    await checkDate(date)
    const summary = await fetchWaka(date)
    console.info('Summary successfully fetched')
    await storeSummary(summary)
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
      .then(response => {
        if (process.env.NODE_ENV === 'production') {
          console.info(response)
          res.end(response)
        } else {
          console.info(response) 
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
}
