const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const companyController = require("../controllers/company/company.controller");
const carController = require("../controllers/car/car.controller");
const userMiddleware = require("../../src/middleware/authJwt");
//const userValidate = require("../controllers/user/user.validate");

router.get("/", companyController.getAllCompanies);
router.get("/cars", companyController.getCompany);
router.post("/", userMiddleware.verifyToken, companyController.createCompany);
router.post("/cars/:id", carController.createCar);
router.put("/:id", companyController.confirmed);

module.exports = router;
