let mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment');

let client = mongoose.Schema({
    remark: {
        type: String,
        default: null,
        index: true
    },
    number_str: {
        type: String,
        default: null,
        index: true
    },
    company_name: {
        type: String,
        default: null,
        index: true
    },
    company_email: {
        type: String,
        default: null,
        index: true
    },
    client_type: {
        type: Array,
        default: [],
        index: true
    },
    payment_terms: {
        type: String,
        default: null,
        index: true
    },
    pdf_name: {
        type: String,
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
    qb_customer_id: {
        type: String,
        default: null,
        index: true
    },
    is_maped: {
        type: Number,
        default: 0,
        index: true
    },
    SyncToken: {
        type: String,
        default: null,
        index: true
    },
}, { timestamps: true })

autoIncrement.initialize(mongoose.connection);
client.plugin(autoIncrement.plugin, {
    model: "client",
    field: "number",
    startAt: 1,
    incrementBy: 1,
});
module.exports = mongoose.model("client", client)