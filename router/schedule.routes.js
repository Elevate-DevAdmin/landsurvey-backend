const express = require('express');
const Joi = require('joi');
const { readAllSchedule, createSchedule } = require('../controller/schedule.controller');
const route = express.Router();

const validation = Joi.object({
  task_number: Joi.string().required().label('Task Number'),
  job_id: Joi.string().hex().length(24).required().label('Job ID'),
  client_id: Joi.string().hex().length(24).required().label('Client ID'),
  project_managers: Joi.array().items(Joi.object()).optional().label('Project Managers'),
  task_scope_id: Joi.string().optional().allow(null, '').label('Task Scope ID'),
  cost_item: Joi.string().optional().allow(null, '').label('Cost Item'),
  group_number: Joi.number().optional().allow(null).label('Group Number'),
  sequence_number: Joi.number().optional().allow(null).label('Sequence Number'),
  planned_date: Joi.date().optional().allow(null).label('Planned Date'),
  assigned_members: Joi.array().items(Joi.string().hex().length(24)).optional().label('Assigned Members'),
  estimated_hours: Joi.number().optional().allow(null).label('Estimated Hours'),
  comments: Joi.array().items(
    Joi.object({ comment_id: Joi.string().hex().length(24).required() })
  ).optional().label('Comments'),
});

const scheduleValidation = (req, res, next) => {
  const { error } = validation.validate(req.body, {
    errors: { label: 'key', wrap: { label: false } },
  });

  if (error) {
    return res.json({
      statusCode: 403,
      message: error.details[0].message,
      success: false,
    });
  }

  next();
};

route.get('/all', readAllSchedule);
route.post('/create', scheduleValidation, createSchedule);

module.exports = route;
