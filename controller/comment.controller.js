const { default: mongoose } = require('mongoose');
const logger = require('../middleware/logger');
const { COMMENT_PIPELINE } = require('../middleware/pipelines');
const comment = require('../models/comment');

exports.createComment = async (req, res) => {
  try {
    const { task_id, user_id, remark } = req.body;

    const newComment = await comment.create({
      task_id,
      user_id,
      remark,
    });

    logger.accessLog.info('comment create passed');

    return res.send({
      statusCode: 200,
      message: 'The comment has been created successfully',
      data: newComment,
    });
  } catch (err) {
    logger.errorLog.error('comment create fail');

    return res.send({
      statusCode: 500,
      message: 'Oops! Something went wrong. Please contact the administrator',
      error: err,
    });
  }
};

exports.readCommentByFilter = async (req, res) => {
  try {
    const { task_id, user_id } = req.query;

    const matchQuery = { is_deleted: false };

    if (task_id) {
      if (!mongoose.Types.ObjectId.isValid(task_id)) {
        return res.send({ statusCode: 400, message: 'Invalid task ID', success: false });
      }
      matchQuery.task_id = new mongoose.Types.ObjectId(task_id);
    }

    if (user_id) {
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.send({ statusCode: 400, message: 'Invalid user ID', success: false });
      }
      matchQuery.user_id = new mongoose.Types.ObjectId(user_id);
    }

    const comments = await comment.aggregate([
      { $match: matchQuery },
      ...COMMENT_PIPELINE,
      { $sort: { createdAt: -1 } },
    ]);

    logger.accessLog.info('comment fetch by filter success');
    res.send({ statusCode: 200, message: 'Comments Fetched Successfully', data: comments });
  } catch (err) {
    logger.errorLog.error('comment fetch by filter fail');
    res.send({ statusCode: 500, message: 'Comment Fetch Fail', error: err });
  }
};

exports.readCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.send({ statusCode: 400, message: 'Invalid comment ID', success: false });
    }

    const commentData = await comment.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id), is_deleted: false },
      },
      ...COMMENT_PIPELINE,
    ]);

    if (!commentData.length) {
      return res.send({ statusCode: 404, message: 'Comment not found', success: false });
    }

    logger.accessLog.info('comment fetch by id success');
    res.send({ statusCode: 200, message: 'Comment Fetch Successfully', data: commentData[0] });
  } catch (err) {
    logger.errorLog.error('comment fetch by id fail');
    res.send({ statusCode: 500, message: 'Comment Fetch Fail', error: err });
  }
};

exports.readAllComment = async (req, res) => {
  try {
    const userData = await comment.aggregate([
      {
        $match: { is_deleted: false },
      },
      ...COMMENT_PIPELINE,
      { $sort: { createdAt: -1 } },
    ]);
    logger.accessLog.info('comment fetch success');
    res.send({
      statusCode: 200,
      massage: 'Comment Fetch Successfully',
      data: userData,
    });
  } catch (err) {
    logger.errorLog.error('comment fetch fail');
    res.send({ statusCode: 500, massage: 'Comment Fetch Fail', error: err });
  }
};
