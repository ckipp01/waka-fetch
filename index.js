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
    res.writeHead(401, { 'Content-Type': 'text/plain' })
    res.end('Authentication required.')
  } else {
    makeRequest()
      .then(response => {
        console.info(response)
        res.writeHead(300, { 'Content-Type': 'text/plain' })
        res.end(response)
      })
      .catch(err => {
        console.error(err)
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.end('Sorry something went wrong with your request.')
      })
  }
}
