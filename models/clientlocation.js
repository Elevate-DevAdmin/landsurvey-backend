let mongoose = require('mongoose')

let clientlocation = mongoose.Schema({

    name: {
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
    munciple_address: {
        type: String,
        default: null,
        index: true
    },
    state: {
        type: String,
        default: null,
        index: true
    },
    state_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        index: true
    },
    city: {
        type: String,
        default: null,
        index: true
    },
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        index: true
    },
    postal_code: {
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

module.exports = mongoose.model("client_location", clientlocation)