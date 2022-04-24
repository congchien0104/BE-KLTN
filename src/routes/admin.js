import express from 'express';
const userController = require("../controllers/user/user.controller");
const userValidate = require("../controllers/user/user.validate");

const router = express.Router();

//= ===============================
// Admin routes
//= ===============================
router.get("/users", userController.allUsers);
router.get("/users/search", userController.allSearchUsers);
router.put("/users/:id", userController.disabledUser);

module.exports = router;