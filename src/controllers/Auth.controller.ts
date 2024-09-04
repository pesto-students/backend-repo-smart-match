import httpStatus from "http-status";
import catchAsync from "../utils/CatchAsync.js";
import { Request, Response } from "express";
import userService from "../services/User.service.js"; // Assuming you have a user service to handle user creation
import tokenService from "../services/Token.service.js";
import authService from "../services/Auth.service.js";

const Register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens({ id: user.id });
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const Login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens({ id: user.id });
  res.send({ user, tokens });
});

const Logout = catchAsync(async (req, res) => {
  console.log("logouty");
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const RefreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

export default {
  Register,
  Login,
  Logout,
  RefreshTokens,
};
