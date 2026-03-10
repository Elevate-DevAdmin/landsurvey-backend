let mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment');

let quote = mongoose.Schema({
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
    quote_number: {
        type: String,
        default: null,
        index: true
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        default: null,
        index: true
    },
    ratesheet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ratesheet',
        default: null,
        index: true
    },
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        default: null,
        index: true
    },
    project_manager: {
        type: Array,
        default: null,
        index: true
    },
    total_estimated_hour: {
        type: Number,
        default: null,
        index: true
    },
    total_cost_hour: {
        type: Number,
        default: null,
        index: true
    },
    attachment: {
        type: String,
        default: null,
        index: true
    },
    name: {
        type: String,
        default: null,
        index: true
    },
    description: {
        type: String,
        default: null,
        index: true
    },
    billable_line_items: {
        type: Object,
        default: {},
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
    is_converted: {
        type: Number,
        default: 0,
        index: true
    },
    site_location: {
        type: String,
        default: null,
        index: true
    },
    number_str: {
        type: String,
        default: null,
        index: true
    },
}, { timestamps: true })

autoIncrement.initialize(mongoose.connection);
quote.plugin(autoIncrement.plugin, {
    model: "quote",
    field: "number",
    startAt: 1,
    incrementBy: 1,
});

module.exports = mongoose.model("quote", quote)