const express = require("express");
const validate = require("express-validation");
const router = express.Router();

import reservationController from '../controllers/reservation/reservation.controller';
import scheduleController from '../controllers/schedule/schedule.controller';
const paymentController = require("../controllers/payment/payment.controller");
const userMiddleware = require("../../src/middleware/authJwt");


//router.get("/", reservationController.getAllReservations);
router.get("/user/:reservationId", reservationController.getReservationOfUser);
router.get("/test/:carId", reservationController.getReservation);
//router.get("/all", userMiddleware.verifyToken, reservationController.getReservationListOfComapany);
router.get("/", userMiddleware.verifyToken, reservationController.getReservationOfCompany);
router.put("/:reservationId", reservationController.getAllReservations); // update status
router.post("/:carId", userMiddleware.verifyToken, scheduleController.createSchedule);
//router.get("/paypal", paymentController.doPaymentServicePackage);
//router.post("/createpaypal", paymentController.createPaypal);

module.exports = router;
