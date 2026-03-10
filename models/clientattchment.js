let mongoose = require('mongoose')

let clientattchment = mongoose.Schema({

    file_name: {
        type: String,
        default: null,
        index: true
    },
    description: {
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
    is_deleted: {
        type: Boolean,
        default: false,
        index: true
    }
}, { timestamps: true })

module.exports = mongoose.model("client_attchment", clientattchment)