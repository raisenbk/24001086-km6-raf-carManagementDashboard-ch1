const express = require("express"); // Importing Express module

const router = express.Router(); // Creating a router object

const carController = require("../controllers/car"); // Importing car controller module

// Handling routes for the '/api/v1/car' endpoint
router
    .route("/") // Handling requests to the root of the '/api/v1/car' endpoint
    .get(carController.getAllCars) // Handling GET requests to retrieve all cars
    .post(carController.createCar) // Handling POST requests to create a new car

// Handling routes for the '/api/v1/car/:id' endpoint    
router
    .route("/:id") // Handling requests to the '/api/v1/car/:id' endpoint
    .get(carController.getCarById) // Handling GET requests to retrieve a car by ID
    .patch(carController.updateCar) // Handling PATCH requests to update a car
    .delete(carController.deleteCar) // Handling DELETE requests to delete a car

// Exporting the router object for use in other modules
module.exports = router;
