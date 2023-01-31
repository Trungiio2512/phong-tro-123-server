import { badRequest, internalServerError } from "../middlewares/http_errors";
import * as postServices from "../services/post";
import { authorization } from "../middlewares/http_errors";

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

export const getNewPosts = async (req, res) => {
  try {
    const response = await postServices.getNewPosts(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
export const getPost = async (req, res) => {
  try {
    // const { page, priceCode, l } = req.query;
    const { id } = req.query;
    console.log(id);
    if (!id) return badRequest(res, "missing id");
    const response = await postServices.getPost(id);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
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
    return internalServerError(res);
  }
};

export const getPostPrivate = async (req, res) => {
  try {
    const { id } = req.user;
    // console.log(id);
    const { page, title, limit } = req.query;
    console.log(req.query);
    if (!page) return badRequest(res, "missing page");

    const response = await postServices.getPostPrivate(id, page, limit, title);
    // console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const updatePostPrivate = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await postServices.updatePostPrivate(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
export const deletePostPrivate = async (req, res) => {
  try {
    const { id } = req.user;
    const { postId, attributesId, imagesId, overviewId } = req.body;
    if (!postId || !attributesId || !imagesId || !overviewId)
      return badRequest(res, "missing input");
    const response = await postServices.deletePostPrivate(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
