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
