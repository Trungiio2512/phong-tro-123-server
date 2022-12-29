import { internalServerError } from "../middlewares/http_errors";
import * as categoryService from "../services/category";

export const getCategories = async (req, res) => {
    try {
        const response = await categoryService.getCategories();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
        // return res.status(500).json(error);
    }
};
