const rp = require('request-promise')


function promisifyRequest(url) {

    return function requestPromise() {
        return rp(url)
    }
}