import { internalServerError } from "../middlewares/http_errors";
import * as services from "../services/registerPost";
export const getRegisterPosts = async (req, res) => {
  try {
    const { id } = req.user;
    // const {postId} = req.body
    const result = await services.getRegisterPosts(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

export const deleted = async (req, res) => {
  try {
    const { id } = req.user;
    const { postId } = req.body;
    // console.log(id);
    const result = await services.deleted(id, postId);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

export const created = async (req, res) => {
  try {
    const { id } = req.user;
    const { postId } = req.body;
    // console.log(id);
    // console.log(postId);
    const result = await services.create(id, postId);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
