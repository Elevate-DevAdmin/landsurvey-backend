let mongoose = require('mongoose')

let taskLegalAddress = mongoose.Schema({
    task_location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        default: null,
        index: true
    },
    lot: {
        type: String,
        default: null,
        index: true
    },
    block: {
        type: String,
        default: null,
        index: true
    },
    plan: {
        type: String,
        default: null,
        index: true
    },
    lsd: {
        type: String,
        default: null,
        index: true
    },
    section: {
        type: String,
        default: null,
        index: true
    },
    township: {
        type: String,
        default: null,
        index: true
    },
    range: {
        type: String,
        default: null,
        index: true
    },
    meridian: {
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

module.exports = mongoose.model("task_legal_address", taskLegalAddress)