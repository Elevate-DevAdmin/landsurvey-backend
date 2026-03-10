let mongoose = require('mongoose')

let ratesheet = mongoose.Schema({

    name: {
        type: String,
        default: null,
        index: true
    },
    pdf_name: {
        type: String,
        default: null,
        index: true
    },
    remark: {
        type: String,
        default: null,
        index: true
    },
    billable_line_items: {
        type: Object,
        default: null,
        index: true
    },
    active: {
        type: Boolean,
        default: false,
        index: true
    },
    is_deleted: {
        type: Boolean,
        default: false,
        index: true
    },

}, { timestamps: true })

module.exports = mongoose.model("ratesheet", ratesheet)