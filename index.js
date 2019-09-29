const config = require('config')
const parse = require('ParseUrlData')
const db = require('./utils/dbMethods')
const requestPromise = promisifyRequest(config.crawlUrl)

db.connect(config)

const opts = {
    maxConnections: config.maxConnections,
    handler: parse
}

const request = new processConcurrentRequest(opts)

request.process(requestPromise)


