const Joi = require('joi');

// Validation schema for creating a car
const createCarSchema = Joi.object({
  category: Joi.string().required(),
  color: Joi.string().required(),
  model: Joi.string().required(),
  make: Joi.string().required(),
  registrationNo: Joi.string().required(),
});

// Validation schema for updating a car
const updateCarSchema = Joi.object({
  category: Joi.string(),
  color: Joi.string(),
  model: Joi.string(),
  make: Joi.string(),
  registrationNo: Joi.string(),
});

module.exports = {
  createCarSchema,
  updateCarSchema,
};
