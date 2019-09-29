const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    url: { type: String, unique: true },
    referenceCount: Number,
    params: [String]
});

module.exports = model('url', urlSchema)

