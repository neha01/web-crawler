const cheerio = require('cheerio')
const url = require('url')
const db = require('./dbMethods')
const requestPromise = require('./promisifyRequest')

function ParseUrlData(body, taskQueue) {
    const $ = cheerio.load(body)
    let links = $('a'); //jquery get all hyperlinks
    $(links).each(function (idx, link) {
        let link = $(link).attr('href')
        let url = link.split('?')[0]
        let url_parts = url.parse(request.url, true)
        let query = url_parts.query;
        let params = Object.keys(query);

        db.updateData(url, params).then(
            taskQueue.push(requestPromise(url))
        ).catch((err) =>
            console.log("error updating url in Db:", err))
    });
}

module.exports = ParseUrlData
