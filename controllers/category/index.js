const express = require("express");
const router = express.Router();
const Category = require("../../models/categoryModel");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../../validations/categoryValidation");

// Create new category API
router.post("/", async (req, res) => {
  // Get user data from the request body
  const { name } = req.body;

  try {
    // Validate the request body against the createCategorySchema
    await createCategorySchema.validateAsync(req.body);

    const category = await Category.create({ name });
    res.status(201).json({ category });
  } catch (error) {
    if (error.isJoi) {
      // Return error response if validation fails
      return res.status(400).json({ error: error.details[0].message });
    }
    res.status(400).json({ message: error.message, isError: true });
  }
});

// Get all categories API
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({}, { name: 1 });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
});

// Get a category by ID API
router.get("/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findById(categoryId, { name: 1 });

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }
    res.status(200).json({ category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a category API
router.put("/:id", async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  try {
    // Validate the request body against the updateCategorySchema
    await updateCategorySchema.validateAsync(req.body);

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    res.status(200).json({ category });
  } catch (error) {
    if (error.isJoi) {
      // Return error response if validation fails
      return res.status(400).json({ error: error.details[0].message });
    }
    res.status(400).json({ message: error.message });
  }
});

// delete a category API
router.delete("/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByIdAndRemove(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
