const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const carController = require("../controllers/car/car.controller");
//const userValidate = require("../controllers/user/user.validate");
const userMiddleware = require("../../src/middleware/authJwt");

router.get("/", carController.getAllCars);
router.get("/:carId", carController.getCar);
router.get("/carseats/:carId", carController.getCarSeat);
router.get("/car/test/temp", carController.getTemp);
router.get("/car/search", carController.getCasesByFilteredRecord);
router.put("/:carId", carController.updateCar);
router.get("/company/temp", userMiddleware.verifyToken, carController.getCarListOfCompany);

module.exports = router;
