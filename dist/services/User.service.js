import httpStatus from "http-status";
const Userm = require("../models/User.model.js");
import ApiError from "../utils/ApiError.js";
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
    if (await Userm.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    return Userm.create(userBody);
};
export default { createUser };
//# sourceMappingURL=User.service.js.map