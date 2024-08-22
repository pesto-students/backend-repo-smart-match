const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync.js");

const register = catchAsync(async (req, res) => {
  //const tokens = await tokenService.generateAuthTokens(user);
  res
    .status(httpStatus.CREATED)
    .send({ message: "User registered successfully" });
});

module.exports = {
  register,
};
