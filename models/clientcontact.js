let mongoose = require('mongoose')

let clientcontact = mongoose.Schema({

    first_name: {
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
    last_name: {
        type: String,
        default: null,
        index: true
    },
    position: {
        type: String,
        default: null,
        index: true
    },
    department: {
        type: String,
        default: null,
        index: true
    },
    location: {
        type: String,
        default: null,
        index: true
    },
    email: {
        type: String,
        default: null,
        index: true
    },
    phone: {
        type: String,
        default: null,
        index: true
    },
    cell: {
        type: String,
        default: null,
        index: true
    },
    remark: {
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

module.exports = mongoose.model("client_contact", clientcontact)