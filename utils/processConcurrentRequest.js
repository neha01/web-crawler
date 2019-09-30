function processConcurrentRequest(opts) {
    this.maxConnections = opts.maxConnections;
    this.handler = opts.handler
    this.requestQueue = []
    this.sentRequests = 0
    this.crawlUrl = opts.crawlUrl
}

processConcurrentRequest.prototype.process = function (requestPromise) {
    this.taskQueue.push(requestPromise)
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



