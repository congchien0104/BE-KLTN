const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const lineController = require("../controllers/line/line.controller");


router.post("/:id", lineController.createLine);
router.get("/:id", lineController.getLine);
router.put("/:id", lineController.updateLine);
router.get("/:companyId/companies", lineController.getLinesList);
router.get("/:lineId/journeys", lineController.getJourneyLineList);

module.exports = router;