const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    url: { type: String, unique: true },
    referenceCount: { type: Number, default: 1 },
    params: [String]
});

module.exports = mongoose.model('url', urlSchema)

