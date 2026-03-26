const mongoose = require('mongoose');
const { startOfDay, endOfDay } = require('date-fns');
const logger = require('../middleware/logger');
const { SCHEDULING_PIPELINE } = require('../middleware/pipelines');
const scheduling = require('../models/scheduling');

exports.readSchedule = async (req, res) => {
  try {
    var page = req.query.page;
    var per_page = req.query.per_page;
    var search = req.query.search ? decodeURIComponent(req.query.search) : '';
    var sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    var user_id = req.query.user_id;
    var start_date = req.query.startDate ?? null;
    var end_date = req.query.endDate ?? null;

    if (page === undefined) {
      page = '1';
    }
    if (per_page === undefined) {
      per_page = process.env.PAGINATION;
    }
    const skip = page * per_page - per_page;

    var myMatch = { is_deleted: false };

    if (
      user_id &&
      user_id !== 'All_Manager' &&
      mongoose.Types.ObjectId.isValid(user_id)
    ) {
      myMatch['project_managers.manager'] = mongoose.Types.ObjectId(user_id);
    }

    if (req.query.endDate && req.query.startDate) {
      const start = startOfDay(new Date(start_date));
      const end = endOfDay(new Date(end_date));
      myMatch.planned_date = { $gte: start, $lt: end };
    }

    if (search === '') {
      var totalDataCount = await scheduling.countDocuments(myMatch);
      var allSchedules = await scheduling.aggregate([
        { $match: myMatch },
        ...SCHEDULING_PIPELINE,
        { $sort: { createdAt: sortOrder } },
        { $skip: parseInt(skip) },
        { $limit: parseInt(per_page) },
      ]);
    } else {
      const matchWhere = {
        $match: {
          $and: [
            myMatch,
            {
              $or: [
                { 'task.number_str': { $regex: search, $options: 'i' } },
                { 'job_id.number_str': { $regex: search, $options: 'i' } },
                { 'client_id.company_name': { $regex: search, $options: 'i' } },
              ],
            },
          ],
        },
      };

      const totalDataCountResult = await scheduling.aggregate([
        ...SCHEDULING_PIPELINE,
        matchWhere,
        { $count: 'totalDataCount' },
      ]);
      var totalDataCount =
        totalDataCountResult.length > 0
          ? totalDataCountResult[0].totalDataCount
          : 0;

      var allSchedules = await scheduling.aggregate([
        ...SCHEDULING_PIPELINE,
        matchWhere,
        { $sort: { createdAt: sortOrder } },
        { $skip: parseInt(skip) },
        { $limit: parseInt(per_page) },
      ]);
    }

    logger.accessLog.info('schedule fetch success');
    res.send({
      statusCode: 200,
      message: 'Schedule Fetched Successfully',
      total: totalDataCount,
      data: allSchedules,
    });
  } catch (err) {
    logger.errorLog.error('schedule fetch fail');
    res.send({ statusCode: 500, message: 'Schedule Fetch Fail', error: err });
  }
};

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
      document_link,
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
      document_link,
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

exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      group_number,
      sequence_number,
      planned_date,
      document_link,
      assigned_members,
      task_scope_id,
      cost_item,
      estimated_hours,
    } = req.body;

    let members = [];

    assigned_members.forEach((id) =>
      members.push({ employee: mongoose.Types.ObjectId(id) }),
    );
    const updateScheduling = await scheduling.findByIdAndUpdate(
      id,
      {
        group_number,
        sequence_number,
        planned_date,
        document_link,
        assigned_members: members,
        task_scope_id,
        cost_item: [cost_item],
        estimated_hours,
      },
      { new: true },
    );
    if (!updateScheduling) {
      return res.send({
        statusCode: 404,
        message: 'Schedule not found',
        success: false,
      });
    }
    logger.accessLog.info('Schedule update success');
    res.send({
      statusCode: 200,
      message: 'The schedule has been updated successfully',
      schedule: updateScheduling,
    });
  } catch (err) {
    logger.errorLog.error('schedule update fail');
    res.send({
      statusCode: 500,
      massage: 'Oops Something went wrong. Please contact the administrator',
      error: err,
    });
  }
};
