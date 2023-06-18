const Joi = require('joi');

// Validation schema for creating a car
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
});

// Validation schema for updating a car
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
