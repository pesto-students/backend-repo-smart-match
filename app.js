const express = require("express");
const httpStatus = require("http-status");
const dotenv = require("dotenv");
const ApiError = require("./src/utils/ApiError");
const routes = require("./src/routes");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.status(httpStatus.OK).send("Hello Smart Match API");
});

app.use(routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
