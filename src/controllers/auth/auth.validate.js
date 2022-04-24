const Joi = require("joi");

export const signup = {
  body: {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

export const signin = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
};
