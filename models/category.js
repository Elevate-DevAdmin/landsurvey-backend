let mongoose = require('mongoose')

let category = mongoose.Schema({

    name: {
        type: String,
        default: null,
        index: true
    },
    sub_category: {
        type: Array,
        default: null,
        index: true
    },
    remark: {
        type: String,
        default: null,
        index: true
    },
}, { timestamps: true })

module.exports = mongoose.model("category", category)