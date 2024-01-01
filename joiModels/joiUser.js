const Joi = require('@hapi/joi');

const userJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Please add user name',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Please add user email',
    'string.email': 'Please enter a valid email address',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Please add password',
  }),
}).options({ abortEarly: false });

module.exports = userJoiSchema;
