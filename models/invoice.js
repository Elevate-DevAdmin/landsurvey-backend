let mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

let invoice = mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.ObjectId,
      default: null,
      index: true,
    },
    client_ref_id: {
      type: String,
      default: null,
      index: true,
    },
    task_ids: {
      type: mongoose.Schema.ObjectId,
      default: null,
      index: true,
    },
    total_cost: {
      type: String,
      default: null,
      index: true,
    },
    number_str: {
      type: String,
      default: null,
      index: true,
    },
    total_hours: {
      type: String,
      default: null,
      index: true,
    },
    qb_invoice_id: {
      type: String,
      default: null,
      index: true,
    },
    generated_date: {
      type: Date,
      default: Date.now,
    },
    is_paid: {
      type: Number,
      default: 0,
      index: true,
    },
    doc_number: {
      type: String,
      default: null,
      index: true,
    },
    lines: {
      type: Array,
      default: [],
      index: true,
    },
    SyncToken: {
      type: String,
      default: null,
      index: true,
    },
    TxnDate: {
      type: Date,
      default: null,
      index: true,
    },
    qb_response: {
      type: Object,
      default: {},
      index: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    sub_total: {
      type: String,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
invoice.plugin(autoIncrement.plugin, {
  model: "invoice",
  field: "number",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("invoice", invoice);
