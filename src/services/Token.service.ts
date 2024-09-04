import jwt from "jsonwebtoken";
import { Document, Schema } from "mongoose";
import Token from "../models/Token.model.js";
import moment from "moment";
import httpStatus from "http-status";
import userService from "../services/User.service.js";
import ApiError from "../utils/ApiError.js";
import { tokenTypes, jwtConfig } from "../config/Tokens.js";

/**
 * Generates a JSON Web Token (JWT) for a user.
 *
 * @param {Schema.Types.ObjectId} userId - The ID of the user.
 * @param {moment.Moment} expires - The expiration time of the token.
 * @param {string} type - The type of the token.
 * @param {string} [secret=jwtConfig.secret] - The secret key to sign the token.
 * @returns {string} The signed JWT.
 */
const generateToken = (
  userId: Schema.Types.ObjectId,
  expires: moment.Moment,
  type: string,
  secret = jwtConfig.secret
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Saves a token to the database.
 *
 * @param {string} token - The token to be saved.
 * @param {Schema.Types.ObjectId} userId - The ID of the user associated with the token.
 * @param {moment.Moment} expires - The expiration time of the token.
 * @param {string} type - The type of the token.
 * @param {boolean} [blacklisted=false] - Whether the token is blacklisted.
 * @returns {Promise<Token>} The saved token document.
 */
const saveToken = async (
  token: string,
  userId: Schema.Types.ObjectId,
  expires: moment.Moment,
  type: string,
  blacklisted = false
): Promise<Document> => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verifies a JSON Web Token (JWT) and retrieves the associated token document from the database.
 *
 * @param {string} token - The JWT to be verified.
 * @param {string} type - The type of the token.
 * @returns {Promise<Token>} The token document if verification is successful.
 * @throws {Error} If the token is not found or verification fails.
 */
const verifyToken = async (token: string, type: string): Promise<Document> => {
  const payload = jwt.verify(token, jwtConfig.secret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

/**
 * Generates authentication tokens (access and refresh) for a user.
 *
 * @param {Object} user - The user object.
 * @param {Schema.Types.ObjectId} user.id - The ID of the user.
 * @returns {Promise<Object>} An object containing the access and refresh tokens along with their expiration times.
 * @returns {Promise<Object>} return.access - The access token details.
 * @returns {Promise<string>} return.access.token - The access token.
 * @returns {Promise<Date>} return.access.expires - The expiration time of the access token.
 * @returns {Promise<Object>} return.refresh - The refresh token details.
 * @returns {Promise<string>} return.refresh.token - The refresh token.
 * @returns {Promise<Date>} return.refresh.expires - The expiration time of the refresh token.
 */
const generateAuthTokens = async (user: {
  id: Schema.Types.ObjectId;
}): Promise<{
  access: {
    token: string;
    expires: Date;
  };
  refresh: {
    token: string;
    expires: Date;
  };
}> => {
  const accessTokenExpires: moment.Moment = moment().add(
    jwtConfig.accessExpirationMinutes,
    "minutes"
  );
  const accessToken: string = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires: moment.Moment = moment().add(
    jwtConfig.refreshExpirationDays,
    "days"
  );
  const refreshToken: string = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.getUserByEmail(email);
  console.log(user);
  if (user === undefined || user === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
  }
  const expires = moment().add(
    jwtConfig.resetPasswordExpirationMinutes,
    "minutes"
  );
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  return resetPasswordToken;
};

/**
 * Generates a verification email token for the user and saves it.
 *
 * @param {Object} user - The user object.
 * @param {Schema.Types.ObjectId} user.id - The user's unique identifier.
 * @returns {Promise<string>} - A promise that resolves to the verification email token.
 */
const generateVerifyEmailToken = async (user: {
  id: Schema.Types.ObjectId;
}): Promise<string> => {
  const expires = moment().add(
    jwtConfig.verifyEmailExpirationMinutes,
    "minutes"
  );
  const verifyEmailToken = generateToken(
    user.id,
    expires,
    tokenTypes.VERIFY_EMAIL
  );
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};

export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};
