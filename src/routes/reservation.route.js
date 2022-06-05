const express = require("express");
const validate = require("express-validation");
const router = express.Router();

import reservationController from '../controllers/reservation/reservation.controller';
const paymentController = require("../controllers/payment/payment.controller");
const userMiddleware = require("../../src/middleware/authJwt");


//router.get("/", reservationController.getAllReservations);
router.get("/user/:reservationId", reservationController.getReservationOfUser);
router.get("/test/:carId", reservationController.getReservation);
router.get("/:carId", reservationController.getReservationOfCar);
router.put("/:reservationId", reservationController.getAllReservations);
//router.get("/paypal", paymentController.doPaymentServicePackage);
//router.post("/createpaypal", paymentController.createPaypal);

module.exports = router;
