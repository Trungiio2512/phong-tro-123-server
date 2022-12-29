import Joi from "joi";

export const name = Joi.string().trim().required();
export const password = Joi.string().min(6).trim().required();
export const phone = Joi.string().trim().required();
export const type = Joi.string().trim().required();
