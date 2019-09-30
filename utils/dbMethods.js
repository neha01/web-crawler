const mongoose = require('mongoose')

function connect(config) {
    let dbUrl = `${config.dbUrl}:${config.port}/${config.dbName}`
    mongoose.connect(process.env.DB_URl || dbUrl, { useNewUrlParser: true })
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
    mongoose.connection.on('open', function callback() {
        console.log('db up and running...', process.env.DB_URl || config.dbUrl)
    })
}
const updateData = function (url, params) {
    var query = { url: url }
    update = { url: url, params: { $addToSet: { params } } }

    options = { upsert: true, new: true, setDefaultsOnInsert: true }

    // Find the document
    Model.findOneAndUpdate(query, update, options, function (error, result) {
        if (error) return;

    });
}

module.exports = {
    connect,
    updateData
}