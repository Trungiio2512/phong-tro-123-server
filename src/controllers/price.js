import { internalServerError } from "../middlewares/http_errors";
import * as priceService from "../services/price";

export const getPrices = async (req, res) => {
    try {
        const response = await priceService.getPrices();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res, error);
        // return res.status(500).json(error);
    }
};
