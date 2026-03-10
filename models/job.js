let mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment');

let job = mongoose.Schema({
    remark: {
        type: String,
        default: null,
        index: true
    },
    pdf_name: {
        type: String,
        default: null,
        index: true
    },
    number_str: {
        type: String,
        default: null,
        index: true
    },
    taxes: {
        type: Array,
        default: null,
        index: true
    },
    fees: {
        type: Array,
        default: null,
        index: true
    },
    client_project: {
        type: String,
        default: null,
        index: true
    },
    po: {
        type: String,
        default: null,
        index: true
    },
    po_amount: {
        type: String,
        default: null,
        index: true
    },
    status: {
        type: String,
        default: null,
        index: true
    },
    status_id: {
        type: mongoose.Schema.ObjectId,
        default: null,
        index: true
    },
    sub_contract: {
        type: String,
        default: null,
        index: true
    },
    order_date: {
        type: String,
        default: null,
        index: true
    },
    due_date: {
        type: String,
        default: null,
        index: true
    },
    invoice_line_item_type: {
        type: String,
        default: null,
        index: true
    },
    taxes_name: {
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
    client_id: {
        type: mongoose.Schema.ObjectId,
        ref: "client",
        index: true
    },
    locations: {
        type: Array,
        default: null,
        index: true,
    },
}, { timestamps: true })

autoIncrement.initialize(mongoose.connection);
job.plugin(autoIncrement.plugin, {
    model: "job",
    field: "number",
    startAt: 1,
    incrementBy: 1,
});

module.exports = mongoose.model("job", job)