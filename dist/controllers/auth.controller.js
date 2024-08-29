import httpStatus from "http-status";
import catchAsync from "../utils/CatchAsync.js";
//import userService from "../services/user.service.js"; // Assuming you have a user service to handle user creation
const Register = catchAsync(async (req, res) => {
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
//# sourceMappingURL=Auth.controller.js.map