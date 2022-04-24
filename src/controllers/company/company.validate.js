const Joi = require("joi");

export const create = {
  body: {
    name: Joi.string().required(),
    adrress: Joi.string().required(),
    //phone: Joi.string().required(),
  },
};
