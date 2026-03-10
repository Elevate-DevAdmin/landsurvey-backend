let mongoose = require('mongoose')

let taxcodes = mongoose.Schema({
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
    SalesTaxRateList: {
        type: Object,
        default: {},
        index: true
    },
    PurchaseTaxRateList: {
        type: Object,
        default: {},
        index: true
    },
    Description: {
        type: String,
        default: null,
        index: true
    },
    SyncToken: {
        type: String,
        default: null,
        index: true
    },
    Taxable: {
        type: Boolean,
        default: null,
        index: true
    },
    is_deleted: {
        type: Boolean,
        default: false,
        index: true
    },
}, { timestamps: true })

module.exports = mongoose.model("taxcodes", taxcodes)