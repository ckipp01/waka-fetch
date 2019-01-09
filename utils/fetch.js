'use strict'

const https = require('https')

const waka = {
  baseUrl: process.env.WAKA_BASE_URL,
  user: process.env.WAKA_USER,
  apiKey: process.env.WAKA_API_KEY
}

const fetchWaka = (date) => {
  return new Promise((resolve, reject) => {
    console.info(`Preparing request for ${date}`)
    const url = `${waka.baseUrl}users/${waka.user}/summaries/?start=${date}&end=${date}&api_key=${waka.apiKey}`

    https.get(url, (resp) => {
      let data = '' 
      resp.on('data', (chunk) => {
        data += chunk
      })
      resp.on('end', () => {
        resolve(data)
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

module.exports.fetchWaka = fetchWaka
