let mongoose = require('mongoose')

let user = mongoose.Schema({
    remark: {
        type: String,
        default: null,
        index: true
    },
    first_name: {
        type: String,
        default: null,
        index: true
    },
    last_name: {
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
    password: {
        type: String,
        default: null,
        index: true
    },
    role: {
        type: String,
        default: 'employee',
        index: true
    },
    permission: {
        type: Array,
        default: ['base_url', 'user_initial-change-password'],
        index: true
    },
    is_deleted: {
        type: Boolean,
        default: false,
        index: true
    },
    password_changed: {
        type: Boolean,
        default: false,
        index: true
    }
}, { timestamps: true })

module.exports = mongoose.model("user", user)