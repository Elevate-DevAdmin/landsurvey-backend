let mongoose = require('mongoose')

let jobscope = mongoose.Schema({

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
    is_deleted: {
        type: Boolean,
        default: false,
        index: true
    },
}, { timestamps: true })

module.exports = mongoose.model("job_scope", jobscope)