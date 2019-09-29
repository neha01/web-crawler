function processConcurrentRequest(opts) {
    this.maxConnections = opts.maxConnections;
    this.handler = opts.handler
    this.requestQueue = []
    this.sentRequests = 0
    this.crawlUrl = opts.crawlUrl
}

processConcurrentRequest.prototype.process = function () {
    this.taskQueue.push(requestPromise)
    this.processRequestQueue()
}

processConcurrentRequest.prototype.processRequestQueue = function () {

    while (this.requestQueue.length && this.sentRequests < this.maxConnections) {
        request = this.requestQueue.shift()
        request().then(
            parseUrldata(body, this.queue)
        ).catch((err) =>
            console.log("error in fetching request from task queue "))
    }

}



