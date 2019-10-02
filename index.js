/* Connects the Db and also promisifies the website Url to be crawled and passes it
to processConcurrentRequest function alongwith options object ans starts crawling */

const config = require('./config')
const parse = require('./utils/parseUrlData')
const db = require('./utils/dbMethods')
const promisifyRequest = require('./utils/promisifyRequest')
const processConcurrentRequest = require('./utils/processConcurrentRequest')

const requestPromise = promisifyRequest(config.crawlUrl)

db.connect(config)

const opts = {
    maxConnections: config.maxConnections,
    handler: parse
}

const request = new processConcurrentRequest(opts)

request.process(requestPromise)


