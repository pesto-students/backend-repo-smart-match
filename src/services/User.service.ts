import httpStatus from "http-status";
const Userm = require("../models/User.model.js");

import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody: {
  email: string;
  [key: string]: any;
}): Promise<typeof Userm> => {
  if (await Userm.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return Userm.create(userBody) as unknown as typeof Userm;
};

export default { createUser };
