import Joi from "joi";
import * as authServices from "../services/auth";
import { phone, name, password } from "../helpers/joi_schema";
import { badRequest, internalServerError } from "../middlewares/http_errors";

export const register = async (req, res) => {
    try {
        const { error } = Joi.object({ name, password, phone }).validate(req.body);

        if (error) return badRequest(res, error?.details[0]?.message);

        const response = await authServices.register(req.body);

        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
export const login = async (req, res) => {
    try {
        const { error } = Joi.object({ password, phone }).validate(req.body);

        if (error) return badRequest(res, error?.details[0]?.message);

        const response = await authServices.login(req.body);

        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
