const cheerio = require('cheerio')
const url = require('url')
const db = require('./dbMethods')
const requestPromise = require('./promisifyRequest')

function parseUrlData(resBody, requestQueue) {
    const $ = cheerio.load(resBody)
    let links = $('a'); //jquery get all hyperlinks
    $(links).each(function (idx, item) {
        let fullLink = $(item).attr('href')
        let link = fullLink.split('?')[0]
        let url_parts = url.parse(fullLink, true)
        let query = url_parts.query
        let params = Object.keys(query)
        console.log("Link: ", link)
        console.log("params: ", params)
        db.updateData(link, params).then(
            () => {
                requestQueue.push(requestPromise(url))
            }
        ).catch((err) =>
            console.log("error updating url in Db:", err))
    })
}

module.exports = parseUrlData
