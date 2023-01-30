import { internalServerError } from "../middlewares/http_errors";
import * as userService from "../services/user";

export const getCurrent = async (req, res) => {
    try {
        const { id } = req.user;
        // console.log(id);
        const response = await userService.getOne(id);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error);
        return internalServerError(res);
        // return res.status(500).json(error);
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await userService.updateUser(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
        // return res.status(500).json(error);
    }
};
export const getLovePosts = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await userService.getLovePosts(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
        // return res.status(500).json(error);
    }
};
