let mongoose = require('mongoose')

let identitycounters = mongoose.Schema({

    model: {
        type: String,
        default: null,
        index: true
    },
    field: {
        type: String,
        default: null,
        index: true
    },
    count: {
        type: Number,
        default: 0,
        index: true
    }
}, { timestamps: true })

module.exports = mongoose.model("identitycounters", identitycounters)