const express = require("express");
const validate = require("../middlewares/validate.js");
const authValidation = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  validate(authController.register),
  authController.register
);

module.exports = router;
