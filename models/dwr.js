let mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

let dwr = mongoose.Schema(
  {
    remark: {
      type: String,
      default: null,
      index: true,
    },
    description: {
      type: String,
      default: null,
      index: true,
    },
    task_id: {
      type: mongoose.Schema.ObjectId,
      ref: "task",
      index: true,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      index: true,
    },
    project_manager_id: {
      type: String,
      default: null,
      index: true,
    },
    project_managers_array: {
      type: Array,
      default: [],
      index: true,
    },
    task_date: {
      type: Date,
      default: null,
      index: true,
    },
    estimate_hour: {
      type: Number,
      default: null,
      index: true,
    },
    task_hour: {
      type: Number,
      default: null,
      index: true,
    },
    billing_line_items: {
      type: Object,
      default: {},
      index: true,
    },
    representative_sign: {
      type: String,
      default: null,
      index: true,
    },
    client_representative_sign: {
      type: String,
      default: null,
      index: true,
    },
    client_representative: {
      type: String,
      default: null,
      index: true,
    },
    client_approved_DWR: {
      type: String,
      default: null,
      index: true,
    },
    dwr_number: {
      type: String,
      default: null,
      index: true,
    },
    submit_date: {
      type: Date,
      default: null,
      index: true,
    },
    submit_status: {
      type: Boolean,
      default: null,
      index: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
dwr.plugin(autoIncrement.plugin, {
  model: "dwr",
  field: "number",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("dwr", dwr);
