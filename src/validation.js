const Joi = require('joi');

const createSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required()
});

const updateSchema = Joi.object({
  name: Joi.string(),
  category: Joi.string()
});

module.exports = { createSchema, updateSchema };
