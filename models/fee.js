let mongoose = require('mongoose')

let fee = mongoose.Schema({

    name: {
        type: String,
        default: null,
        index: true
    },
    percentage: {
        type: String,
        default: null,
        index: true
    },
    is_deleted: {
        type: Boolean,
        default: false,
        index: true
    },
}, { timestamps: true })

module.exports = mongoose.model("fee", fee)