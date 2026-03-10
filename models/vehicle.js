let mongoose = require('mongoose')

let vehicle = mongoose.Schema({

    unit_number: {
        type: String,
        default: null,
        index: true
    },
    make: {
        type: String,
        default: null,
        index: true
    },
    model: {
        type: String,
        default: null,
        index: true
    },
    year: {
        type: String,
        default: null,
        index: true
    },
    active: {
        type: Boolean,
        default: null,
        index: true
    },
    remark: {
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

module.exports = mongoose.model("vehicle", vehicle)