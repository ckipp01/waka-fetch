'use strict'

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const dbName = process.env.DB_NAME
const collectionName = process.env.DB_COLLECTION 
const url = process.env.DB_URL 

const storeSummary = summary => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(url, { useNewUrlParser: true })

    client.connect((err) => {
      assert.equal(null, err)
      console.info('Connected successfully to server')
      const db = client.db(dbName)

      insertDocument(db, collectionName, summary)
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

module.exports.storeSummary = storeSummary 
