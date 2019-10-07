/* processConcurrentRequest accepts options object which can be used to specify
 maxConnections and  a handler function to process request */

function processConcurrentRequest(opts) {
    this.maxConnections = opts.maxConnections;
    this.handler = opts.handler
    this.requestQueue = []
    this.sentRequests = 0
}

processConcurrentRequest.prototype.process = function (requestPromise) {
    this.requestQueue.push(requestPromise)
    this.processRequestQueue()
}

processConcurrentRequest.prototype.processRequestQueue = function () {
    let self = this

    while (self.requestQueue.length && self.sentRequests <= self.maxConnections) {
        let request = self.requestQueue.shift()
        self.sentRequests++
        request().then(
            (body) => {
                self.handler(body, self)
            }
        ).catch((err) => {

        }).finally(() => {
            self.sentRequests--
            self.processRequestQueue()
        })
    }
}

module.exports = processConcurrentRequest



