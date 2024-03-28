const express = require("express")

const router = express.Router()

const carController = require("../controllers/carController")

router
    .route("/")
    .get(carController.getCars)
    .post(carController.createCar)
router
    .route("/:id")
    .get(carController.getCarById)
    .patch(carController.updateCar)
    .delete(carController.deleteCar)

module.exports = router