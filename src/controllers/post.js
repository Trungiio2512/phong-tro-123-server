import { internalServerError } from "../middlewares/http_errors";
import * as postServices from "../services/post";
import { authorization } from "../middlewares/http_errors";

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

//Private Methods
export const createNewPost = async (req, res) => {
    try {
        const { id } = req.user;
        const { categoryCode, province, label, priceNumber, areaNumber } = req.body;
        if (!id) return authorization(res, "you must provide token");
        if (!categoryCode) {
            return res.status(402).json({ err: 1, msg: "Invalid category code" });
        }
        const response = await postServices.createNewPost(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res, error);
    }
};

export const getPostPrivate = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) return authorization(res, "You do not logged in");
        const response = await postServices.getPostPrivate(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res, error);
    }
};
export const updatePostPrivate = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) return authorization(res, "You do not logged in");
        const response = await postServices.updatePostPrivate(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res, error);
    }
};
