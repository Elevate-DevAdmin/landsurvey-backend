let mongoose = require('mongoose')

let costiteam = mongoose.Schema({

    name: {
        type: String,
        default: null,
        index: true
    },
    unit: {
        type: String,
        default: null,
        index: true
    },
    unit_cost: {
        type: String,
        default: null,
        index: true
    },
    hourly_cost: {
        type: String,
        default: null,
        index: true
    },
    gl_code: {
        type: String,
        default: null,
        index: true
    },
    category: {
        type: String,
        default: null,
        index: true
    },
    sub_category: {
        type: String,
        default: null,
        index: true
    },
    tax_exempt: {
        type: Boolean,
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

module.exports = mongoose.model("cost_iteam", costiteam)