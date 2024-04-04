const express = require("express"); // Importing Express module

const router = express.Router(); // Creating a router object

const adminController = require("../controllers/admin"); // Importing admin controller module

const uploader = require("../middlewares/upload"); // Importing file upload middleware

// Handling route for the root of the '/dashboard' endpoint
router.route("/") // Handling GET requests to the root of the '/dashboard' endpoint
  .get(adminController.adminPage); // Rendering admin page

// Handling routes for the '/dashboard/create' endpoint
router.route("/create")
  .get(adminController.createCarPage) // Handling GET requests to render create car page
  .post(uploader.single("image"), adminController.createCar); // Handling POST requests to create a new car

// Handling routes for the '/dashboard/edit' endpoint
router.route("/edit")
  .get(adminController.editCarPage) // Handling GET requests to render edit car page
  .post(uploader.single("image"), adminController.editCar); // Handling POST requests to edit a car

// Handling GET requests to delete a car by ID
router.route("/delete/:id")
  .get(adminController.deleteCar); // Rendering page to confirm car deletion

module.exports = router; // Exporting the router object for use in other modules
