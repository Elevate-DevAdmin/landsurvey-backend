let mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment');

let quickbook = mongoose.Schema({
    refresh_token: {
        type: String,
        default: null,
        index: true
    },
    generated_date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

autoIncrement.initialize(mongoose.connection);
quickbook.plugin(autoIncrement.plugin, {
    model: "quickbook",
    field: "number",
    startAt: 1,
    incrementBy: 1,
});

// module.exports = mongoose.model("quickbook-produtions", quickbook)
module.exports = mongoose.model(process.env.QB_IS_PRODUCTION === '1' ? "quickbook-produtions" : "quickbook", quickbook)