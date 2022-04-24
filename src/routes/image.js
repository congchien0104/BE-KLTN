const express = require("express");
const { uploadFiles } = require("../controllers/car/upload");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/upload", uploadFiles);

module.exports = router;
