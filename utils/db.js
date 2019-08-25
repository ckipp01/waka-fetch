'use strict'

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const mongo = {
  name: process.env.WAKA_FETCH_DB_NAME,
  collection: process.env.WAKA_FETCH_DB_COLLECTION,
  url: process.env.WAKA_FETCH_DB_URL
}

const storeSummary = summary => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(mongo.url, { useNewUrlParser: true })

    client.connect((err) => {
      assert.equal(null, err)
      console.info('Connected successfully to server to store summary')
      const db = client.db(mongo.name)

      insertDocument(db, mongo.collection, summary)
        .then(result => {
          client.close()
          resolve(result)
        })
        .catch(err => {
          client.close()
          reject(err)
        })
    })
  })
}

const insertDocument = (db, collectionName, summary) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName)
    const parsedJson = JSON.parse(summary)
    collection.insertOne(parsedJson)
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const checkDate = (date) => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(mongo.url, { useNewUrlParser: true })
    const query = { 'data.range.date': date }
    client.connect((err) => {
      assert.equal(null, err)
      console.info('Connected successfully to server to check date')
      const db = client.db(mongo.name)
      db.collection(mongo.collection)
        .find(query)
        .toArray((err, result) => {
          client.close()
          if (err) {
            client.close()
            reject(err)
          } else {
            if (result.length > 0) {
              reject('This date is already stored')
            }
            resolve(result)
          }
        })
    })
  })
}

module.exports = { storeSummary, checkDate }
