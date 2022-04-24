const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const carController = require("../controllers/car/car.controller");
//const userValidate = require("../controllers/user/user.validate");

router.get("/", carController.getAllCars);
router.get("/:carId", carController.getCar);
router.get("/carseats/:carId", carController.getCarSeat);
//router.get("/car/search", carController.searchCar);
router.get("/car/search", carController.getCasesByFilteredRecord);
router.put("/:carId", carController.updateCar);

module.exports = router;
