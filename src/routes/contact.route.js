const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const contactController = require("../controllers/contact/contact.controller");

router.post("/", contactController.createContact);
router.get("/temp", contactController.temp);

module.exports = router;