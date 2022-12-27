import Joi from "joi";

export const name = Joi.string().alphanum().trim().required();
export const password = Joi.string().alphanum().min(6).trim().required();
export const phone = Joi.string().required();
