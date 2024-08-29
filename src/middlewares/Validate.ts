import Joi from "joi";
import httpStatus from "http-status";
import pick from "../utils/Pick.js"
import { Request, Response, NextFunction } from "express";
import { ParsedQs } from "qs";
import { ParamsDictionary } from "express-serve-static-core"; // Add this line
import ApiError from "../utils/ApiError.js"

const Validate = (schema) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema) as (keyof Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>)[]);
  console.log(schema,object, validSchema);
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default Validate;