import { internalServerError } from "../middlewares/http_errors";
import * as provinceService from "../services/province";

export const getProvinces = async (req, res) => {
    try {
        const response = await provinceService.getProvinces();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
        // return res.status(500).json(error);
    }
};
