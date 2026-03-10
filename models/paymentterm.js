let mongoose = require('mongoose')

let paymentterm = mongoose.Schema({
    remark: {
        type: String,
        default: null,
        index: true
    },
    name: {
        type: String,
        default: null,
        index: true
    },
    is_deleted: {
        type: Boolean,
        default: false,
        index: true
    }
}, { timestamps: true })

module.exports = mongoose.model("payment_term", paymentterm)