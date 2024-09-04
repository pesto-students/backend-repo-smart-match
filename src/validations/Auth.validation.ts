import Joi from "joi";

const Register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

const Login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const Logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const RefreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export default { Register, Login, Logout, RefreshTokens };
