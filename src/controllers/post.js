import { internalServerError } from "../middlewares/http_errors";
import * as postServices from "../services/post";

export const getPosts = async (req, res) => {
    try {
        const response = await postServices.getPosts();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res, error);
    }
};

export const getPostsLimit = async (req, res) => {
    try {
        // const { page, priceCode, l } = req.query;
        console.log(req.query);
        const response = await postServices.getPostsLimit(req.query);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res, error);
    }
};

export const getNewPosts = async (req, res) => {
    try {
        // const { page, priceCode, l } = req.query;
        const response = await postServices.getNewPosts();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res, error);
    }
};

export const createNewPost = async (req, res) => {
    try {
        const { id } = req.user;

        const { categoryCode, province, label, priceNumber, areaNumber } = req.body;
        if (!categoryCode) {
            return res.status(402).json({ err: 1, msg: "Invalid category code" });
        }
        const response = await postServices.createNewPost(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: 1,
            msg: error,
        });
    }
};
