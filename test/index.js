const test = require('../index.js')

const fakeReq = {
  headers: {
    authorization: 'test'
  }
}

test(fakeReq)
