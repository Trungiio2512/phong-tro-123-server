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

export const getPostsLimit = async (req, res) => {
    try {
        // const { page, priceCode, l } = req.query;
        console.log(req.query);
        const response = await postServices.getPostsLimit(req.query);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
