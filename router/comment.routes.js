const express = require('express');
const Joi = require('joi');
const {
  createComment,
  readAllComment,
} = require('../controller/comment.controller');
const route = express.Router();

const validation = Joi.object({
  remark: Joi.string().required().label('Remark'),

  task_id: Joi.string().hex().length(24).required().label('Task ID'),

  user_id: Joi.string().hex().length(24).required().label('User ID'),
});

const commentValidation = (req, res, next) => {
  const { error } = validation.validate(req.body, {
    errors: { label: 'key', wrap: { label: false } },
  });

  if (error) {
    return res.json({
      status: 403,
      message: error.details[0].message,
      success: false,
    });
  }

  next();
};

route.get('/all', readAllComment);
route.post('/create', createComment);

module.exports = route;
