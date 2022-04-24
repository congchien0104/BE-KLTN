const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const reservationController = require("../controllers/reservation/reservation.controller");
const paymentController = require("../controllers/payment/payment.controller");
const userMiddleware = require("../../src/middleware/authJwt");


router.get("/paypal", paymentController.doPaymentServicePackage);
router.post("/createpaypal", paymentController.createPaypal);

module.exports = router;