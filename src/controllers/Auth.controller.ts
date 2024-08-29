import httpStatus from "http-status";
import catchAsync from "../utils/CatchAsync.js";
import { Request, Response } from "express";
//import userService from "../services/user.service.js"; // Assuming you have a user service to handle user creation

const Register = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  //const user = await userService.createUser({ email, password });
  //const tokens = await tokenService.generateAuthTokens(user);
  res
    .status(httpStatus.CREATED)
    .send({ message: "User Registered successfully", user });
});

export default {
  Register,
};
