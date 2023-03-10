import Joi from "joi";
import * as authServices from "../services/auth";
import { phone, name, password, type } from "../helpers/joi_schema";
import { badRequest, internalServerError } from "../middlewares/http_errors";

export const register = async (req, res) => {
    try {
        if (req.body.type !== "R2" && req.body.type !== "R3") {
            return badRequest(res, "Type user not allowed");
        }

        const { error } = Joi.object({ name, password, phone, type }).validate(req.body);

        if (error) return badRequest(res, error?.details[0]?.message);

        // res.cookie("name", "werwerwrwrwe");
        const result = await authServices.register(req.body);

        return res.status(200).json(result);
    } catch (error) {
        return internalServerError(res);
    }
};
export const login = async (req, res) => {
    try {
        const { error } = Joi.object({ password, phone }).validate(req.body);

        if (error) return badRequest(res, error?.details[0]?.message);

        const result = await authServices.login(req.body);
        // res.cookie("name", "werwerwrwrwe");

        return res.status(200).json(result);
    } catch (error) {
        return internalServerError(res);
    }
};
export const refresh = async (req, res) => {
    try {
        const { id } = req.user;
        const { refreshToken } = req.body;
        const respone = await authServices.refresh(id, refreshToken);
        return res.status(200).json(respone);
    } catch (error) {
        return internalServerError(res);
    }
};
