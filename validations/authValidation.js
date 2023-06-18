const Joi = require('joi');

// Validation schema for register
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
});

// Validation schema for login
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
