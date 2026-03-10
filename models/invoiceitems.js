let mongoose = require('mongoose')

let invoiceitems = mongoose.Schema({
    Id: {
        type: String,
        default: null,
        index: true
    },
    Name: {
        type: String,
        default: null,
        index: true
    },
    UnitPrice: {
        type: Number,
        default: 0,
        index: true
    },
    SyncToken: {
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

// module.exports = mongoose.model("invoice_items", invoiceitems)
module.exports = mongoose.model(process.env.QB_IS_PRODUCTION === '1' ? "invoice_items-produtions" : "invoice_items", invoiceitems)
