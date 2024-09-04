import express from "express";
import Validate from "../middlewares/Validate.js";
import AuthValidation from "../validations/Auth.validation.js";
import AuthController from "../controllers/Auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  Validate(AuthValidation.Register),
  AuthController.Register
);

router.post("/login", Validate(AuthValidation.Login), AuthController.Login);

router.post("/logout", Validate(AuthValidation.Logout), AuthController.Logout);

router.post(
  "/refresh-tokens",
  Validate(AuthValidation.RefreshTokens),
  AuthController.RefreshTokens
);

export default router;
