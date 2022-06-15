const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const lineController = require("../controllers/line/line.controller");


router.post("/:id", lineController.createLine);
router.get("/:id", lineController.getLines);
router.put("/:id", lineController.updateLine);

module.exports = router;