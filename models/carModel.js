const mongoose = require("mongoose");

// creating schema for car
const carSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
    unique: true,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
