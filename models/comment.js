let mongoose = require('mongoose');

let comment = mongoose.Schema(
  {
    remark: {
      type: String,
      default: null,
      index: true,
    },
    schedule_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'task',
      default: null,
      index: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
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

module.exports = mongoose.model('comment', comment);
