/* promisifyRequest accepts a Url and returns promisified request */

const rp = require('request-promise')

function promisifyRequest(url) {

    return function requestPromise() {
        return rp(url)
    }
}

module.exports = promisifyRequest