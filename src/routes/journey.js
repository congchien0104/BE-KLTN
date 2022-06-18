const express = require("express");
const validate = require("express-validation");
const router = express.Router();

const journeyController = require("../controllers/journey/journey.controller");


router.get("/:lineId", journeyController.getJourneyLineList);
router.post("/", journeyController.createManyJourney);
router.post("/add", journeyController.createJourney);
router.put("/:journeyId", journeyController.updateJourney);
router.delete("/:journeyId", journeyController.deleteJourney);

module.exports = router;