const logger = require('../middleware/logger');
const { SCHEDULING_PIPELINE } = require('../middleware/pipelines');
const scheduling = require('../models/scheduling');

exports.createSchedule = async (req, res) => {
  try {
    const {
      task_number,
      job_id,
      client_id,
      project_managers,
      task_scope_id,
      cost_item,
      group_number,
      sequence_number,
      planned_date,
      assigned_members,
      estimated_hours,
      comments,
    } = req.body;

    const newSchedule = await scheduling.create({
      task_number,
      job_id,
      client_id,
      project_managers,
      task_scope_id,
      cost_item,
      group_number,
      sequence_number,
      planned_date,
      assigned_members,
      estimated_hours,
      comments,
    });

    logger.accessLog.info('schedule create success');
    return res.send({
      statusCode: 200,
      message: 'Schedule created successfully',
      data: newSchedule,
    });
  } catch (err) {
    logger.errorLog.error('schedule create fail');
    return res.send({
      statusCode: 500,
      message: 'Oops! Something went wrong. Please contact the administrator',
      error: err,
    });
  }
};

exports.readAllSchedule = async (req, res) => {
  try {
    const data = await scheduling.aggregate([
      { $match: { is_deleted: false } },
      ...SCHEDULING_PIPELINE,
      { $sort: { createdAt: -1 } },
    ]);

    logger.accessLog.info('schedule fetch success');
    res.send({
      statusCode: 200,
      message: 'Schedule Fetched Successfully',
      data,
    });
  } catch (err) {
    logger.errorLog.error('schedule fetch fail');
    res.send({ statusCode: 500, message: 'Schedule Fetch Fail', error: err });
  }
};
