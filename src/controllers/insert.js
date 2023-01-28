import * as authServices from "../services/insert";
import { internalServerError } from "../middlewares/http_errors";
export const insert = async (req, res) => {
    try {
        const response = await authServices.insert();

        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
