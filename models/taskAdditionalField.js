let mongoose = require('mongoose')

let taskAdditionalField = mongoose.Schema({
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        default: null,
        index: true
    },
    name: {
        type: String,
        default: null,
        index: true
    },
    value: {
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

module.exports = mongoose.model("task_additional_field", taskAdditionalField)