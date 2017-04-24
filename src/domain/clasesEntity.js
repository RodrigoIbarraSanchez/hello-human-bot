var mongoose = require('mongoose');

var claseSchema = new mongoose.Schema({
    name: String,
    start: Number,
    ends: Number
})

module.exports = mongoose.model('Clases', claseSchema)