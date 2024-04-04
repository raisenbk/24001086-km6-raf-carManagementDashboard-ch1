const fs = require("fs"); // Importing fs module for file system operations
const Car = require("../models/cars"); // Importing Car model

// Controller function to get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find(); // Find all cars
    res.status(200).json({ // Sending response with status 200 and list of cars
      status: "success",
      requestTime: req.requestTime,
      length: cars.length,
      data: {
        cars,
      },
    });
  } catch (err) {
    // Catching errors and sending response with status 404
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

// Controller function to get a car by ID
const getCarById = async (req, res) => {
  try {
    const id = req.params.id; // Getting car ID from request parameters
    const car = await Car.findById(id); // Finding car by ID
    res.status(200).json({ // Sending response with status 200 and car data
      status: "success",
      data: {
        car
      }
    });
  } catch (err) {
    // Catching errors and sending response with status 400
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

// Controller function to update a car
const updateCar = async (req, res) => {
  try {
    const id = req.params.id; // Getting car ID from request parameters
    const car = await Car.findByIdAndUpdate(id, req.body, { // Finding and updating car
      new: true, // Return the updated document
      runValidators: true // Validate before saving
    });
    res.status(200).json({ // Sending response with status 200 and updated car data
      status: "success",
      message: "Data updated",
      data: { car }
    });
  } catch (err) {
    // Catching errors and sending response with status 400
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

// Controller function to delete a car
const deleteCar = async (req, res) => {
  try {
    const id = req.params.id; // Getting car ID from request parameters
    await Car.findByIdAndDelete(id); // Finding and deleting car by ID
    res.status(200).json({ // Sending response with status 200 and success message
      status: 'success',
      message: 'Data has been deleted'
    });
  } catch (err) {
    // Catching errors and sending response with status 400
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

// Controller function to create a new car
const createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body); // Creating a new car
    res.status(201).json({ // Sending response with status 201 and created car data
      status: 'success',
      data: newCar
    });
  } catch (err) {
    // Catching errors and sending response with status 400
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

// Exporting all controller functions for use in other modules
module.exports = {
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  createCar,
};
