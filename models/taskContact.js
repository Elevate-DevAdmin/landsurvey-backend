let mongoose = require('mongoose')

let taskcontact = mongoose.Schema({
    client_contact_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client_contact',
        default: null,
        index: true
    },
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        default: null,
        index: true
    },
    add_to_invoice: {
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

module.exports = mongoose.model("task_contact", taskcontact)