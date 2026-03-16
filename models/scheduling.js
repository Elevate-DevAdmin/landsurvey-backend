let mongoose = require('mongoose');

let scheduling = mongoose.Schema(
  {
    task_number: {
      // number_str in the task collection
      type: String,
      default: null,
      index: true,
    },
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'job',
      default: null,
      index: true,
    },
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client',
      default: null,
      index: true,
    },
    project_managers: {
      type: [
        { manager: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } },
      ],
      default: [],
      index: true,
    },
    task_scope_id: {
      type: String,
      default: null,
      index: true,
    },
    cost_item: {
      type: String,
      default: null,
      index: true,
    },
    group_number: {
      type: Number,
      default: null,
      index: true,
    },
    sequence_number: {
      type: Number,
      default: null,
      index: true,
    },
    planned_date: {
      type: Date,
      default: null,
      index: true,
    },
    assigned_members: {
      type: [
        { employee: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } },
      ],
      default: [],
      index: true,
    },
    comments: {
      type: [
        {
          comment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'comment' },
        },
      ],
      default: [],
      index: true,
    },
    estimated_hours: {
      type: Number,
      default: null,
      index: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('scheduling', scheduling);
