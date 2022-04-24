const express = require("express");
const validate = require("express-validation");
const router = express.Router({ mergeParams: true });

const authController = require("../controllers/auth/auth.controller");
const authValidate = require("../controllers/auth/auth.validate");
const verifySignup = require("../middleware/verifySignup");

router.post("/signup", validate(authValidate.signup), authController.signup);
router.post("/signin", validate(authValidate.signin), authController.signin);
router.get("/confirm/:confirmationcode", authController.verifyUser);
router.post("/refreshtoken", authController.refreshToken);
router.post("/forgot", authController.forgot);
router.post("/reset/:confirmationcode", authController.reset);

// router.get("/getuser", authController.show);
// router.get("/gettoken", authController.getRefreshToken);
// router.get("/user", authController.index);

module.exports = router;
