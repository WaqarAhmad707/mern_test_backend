const express = require("express");
const router = express.Router();
const Car = require("../../models/carModel");
const {
  createCarSchema,
  updateCarSchema,
} = require("../../validations/carValidation");

// Add Car API
router.post("/", async (req, res) => {
  // Get user data from the request body
  const { category, color, model, make, registrationNo } = req.body;

  try {
    // checking JOI validations here
    await createCarSchema.validateAsync(req.body);

    // saving car into DB
    const car = await Car.create({
      category,
      color,
      model,
      make,
      registrationNo,
    });

    // Getting newly created car with its category name
    const carWithCategory = await Car.findById(car._id).populate("category", {
      name: 1,
    });

    // Return success response
    res.status(201).json({ car: carWithCategory });
  } catch (error) {
    if (error.isJoi) {
      // Return error response if validation fails
      return res.status(400).json({ error: error.details[0].message });
    }
    res.status(400).json({ message: error.message });
  }
});

// Get All Cars API
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().populate("category", { name: 1 });
    res.status(200).json({ cars });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get A Car By ID API
router.get("/:id", async (req, res) => {
  const carId = req.params.id;
  try {
    const car = await Car.findById(carId).populate("category", { name: 1 });

    // checking is car not exist
    if (!car) {
      return res.status(400).json({ message: "Car not found" });
    }
    res.status(200).json({ car });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update A Car API
router.put("/:id", async (req, res) => {
  const carId = req.params.id;
  const { category, color, model, make, registrationNo } = req.body;

  try {
    // Checking JOI validations
    await updateCarSchema.validateAsync(req.body);

    const car = await Car.findByIdAndUpdate(
      carId,
      { category, color, model, make, registrationNo },
      { new: true }
    ).populate("category", { name: 1 });

    if (!car) {
      return res.status(400).json({ message: "Car not found" });
    }

    res.status(200).json({ car });
  } catch (error) {
    if (error.isJoi) {
      // Return error response if validation fails
      return res.status(400).json({ error: error.details[0].message });
    }
    res.status(400).json({ message: error.message });
  }
});

// Delete A Car API
router.delete("/:id", async (req, res) => {
  const carId = req.params.id;
  try {
    const car = await Car.findByIdAndRemove(carId);

    // checking car exists or not
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
