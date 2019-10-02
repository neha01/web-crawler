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

    while (this.requestQueue.length && this.sentRequests <= this.maxConnections) {
        request = this.requestQueue.shift()
        this.sentRequests++
        request().then(
            (body) => {
                this.handler(body, this.requestQueue)
                this.sentRequests--
                this.processRequestQueue()
            }
        ).catch((err) => {
            this.sentRequests--
            this.processRequestQueue()
        }
        )
    }
}

module.exports = processConcurrentRequest



