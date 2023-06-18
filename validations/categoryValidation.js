const Joi = require('joi');

// Validation schema for creating a car
const createCategorySchema = Joi.object({
  name: Joi.string().required(),
});

// Validation schema for updating a car
const updateCategorySchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
