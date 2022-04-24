const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const scheduleController = require("../controllers/schedule/schedule.controller");
//const userValidate = require("../controllers/user/user.validate");

router.get("/", scheduleController.getAllRoutes);
router.get("/car/:carId", scheduleController.getSheduleOfCar);
router.get("/route/:routeId", scheduleController.getSheduleOfRoute);
router.post("/:carId", scheduleController.createSchedule);

module.exports = router;
