import httpStatus from "http-status";
import User from "../models/User.model.js";

import ApiError from "../utils/ApiError.js";
import { ObjectId } from "mongoose";

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody: {
  email: string;
  [key: string]: any;
}): Promise<typeof User> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return User.create(userBody) as unknown as typeof User;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id: ObjectId): Promise<Document> => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email: string): Promise<typeof User> => {
  return User.findOne({ email });
};

export default { createUser, getUserById, getUserByEmail };
