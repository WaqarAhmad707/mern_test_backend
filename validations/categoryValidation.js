const Joi = require("joi");

// Validation schema for creating a category
const createCategorySchema = Joi.object({
  name: Joi.string().required(),
});

// Validation schema for updating a category
const updateCategorySchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
