import httpStatus from "http-status";
import tokenService from "./Token.service.js";
import userService from "./User.service.js";
import Token from "../models/Token.model.js";
import ApiError from "../utils/ApiError.js";
import { tokenTypes } from "../config/Tokens.js";
import User from "../models/User.model.js";

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<typeof User> => {
  const user = await userService.getUserByEmail(email);
  console.log(user);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */

const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await refreshTokenDoc.deleteOne();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken: string): Promise<Object> => {
  try {
    console.log(refreshToken);
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    console.log(user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.deleteOne();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

export default { loginUserWithEmailAndPassword, logout, refreshAuth };
