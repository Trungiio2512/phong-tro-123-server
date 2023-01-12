import { internalServerError } from "../middlewares/http_errors";
import * as userService from "../services/user";

export const getCurrent = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await userService.getOne(id);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res, error);
        // return res.status(500).json(error);
    }
};
