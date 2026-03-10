let mongoose = require('mongoose')

let tasklocation = mongoose.Schema({
    name: {
        type: String,
        default: null,
        index: true
    },
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        default: null,
        index: true
    },
    munciple_address: {
        type: String,
        default: null,
        index: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'state',
        default: null,
        index: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
        default: null,
        index: true
    },
    latitude: {
        type: String,
        default: null,
        index: true
    },
    longitude: {
        type: String,
        default: null,
        index: true
    },
    map_display: {
        type: Boolean,
        default: false,
        index: true
    },
    is_deleted: {
        type: Boolean,
        default: false,
        index: true
    }

}, { timestamps: true })

module.exports = mongoose.model("task_location", tasklocation)