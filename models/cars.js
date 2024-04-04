const mongoose = require("mongoose"); // Importing Mongoose module

// Defining the car schema
const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Car name is required"], // Validation for required car name
  },
  priceRent: {
    type: Number,
    required: [true, "Price rent is required"], // Validation for required price rent
  },
  seats: {
    type: Number,
    default: 4, // Default value for seats is 4
  },
  type: {
    type: String,
    required: [true, "Car type is required"], // Validation for required car type
  },
  image: {
    type: String,
    required: [true, "Car Image is required"], // Validation for required image car
  },
  createdAt: {
    type: Date,
    default: Date.now(), // Default value for createdAt is the current date/time
  },
  lastModified: {
    type: String,
    default: new Date().toDateString(), // Default value for lastModified is the current date in string format
  },
});

// Creating a Car model from the car schema
const Car = mongoose.model("Car", carSchema);

module.exports = Car; // Exporting the Car model for use in other modules
