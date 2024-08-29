import express from "express";
import Validate from "../middlewares/Validate.js"
import AuthValidation from "../validations/Auth.validation.js";
import AuthController from "../controllers/Auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  Validate(AuthValidation.Register), // Use the Schema type for validation
  AuthController.Register
);

export default router;
