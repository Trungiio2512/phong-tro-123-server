import { internalServerError } from "../middlewares/http_errors";
import * as areaService from "../services/area";

export const getAreas = async (req, res) => {
    try {
        const response = await areaService.getAreas();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res, error);
        // return res.status(500).json(error);
    }
};
