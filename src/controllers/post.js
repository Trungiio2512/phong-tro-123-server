import { internalServerError } from "../middlewares/http_errors";
import * as postServices from "../services/post";

export const getPosts = async (req, res) => {
    try {
        const response = await postServices.getPosts();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
