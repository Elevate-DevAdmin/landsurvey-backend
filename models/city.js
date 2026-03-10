let mongoose = require('mongoose')

let city = mongoose.Schema({

    name: {
        type: String,
        default: null,
        index: true
    },
    remark: {
        type: String,
        default: null,
        index: true
    },
    state_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'state',
        default: null,
        index: true
    },
    is_deleted: {
        type: Boolean,
        default: false,
        index: true
    }
}, { timestamps: true })

module.exports = mongoose.model("city", city)