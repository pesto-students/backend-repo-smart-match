import express from "express";
import httpStatus from "http-status";
import dotenv from "dotenv";
import ApiError from "./utils/ApiError.js";
import MainRouter from "./routes/MainRouter.js";
import mongoSanitize from 'express-mongo-sanitize';
dotenv.config();
const App = express();
// parse json request body
App.use(express.json());
// parse urlencoded request body
App.use(express.urlencoded({ extended: true }));
// sanitize request data
App.use(mongoSanitize());
App.get("/", (_req, res) => {
    res.status(httpStatus.OK).send("Hello Smart Match API");
    return true;
});
App.use(MainRouter);
// send back a 404 error for any unknown api request
App.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
export default App;
//# sourceMappingURL=App.js.map