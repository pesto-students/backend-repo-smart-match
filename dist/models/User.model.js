import mongoose from "mongoose";
import validator from "validator";
import { roles } from "../config/Roles.js";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error("Password must contain at least one letter and one number");
            }
        },
        private: true, // used by the toJSON plugin
    },
    role: {
        type: String,
        enum: roles,
        default: "user",
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};
/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
/* userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
}; */
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=User.model.js.map