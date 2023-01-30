import { internalServerError } from "../middlewares/http_errors";
import * as adminServices from "../services/admin";

export const getUsers = async (req, res) => {
    try {
        const { page, limit, name } = req.query;
        console.log(req.query);
        const response = await adminServices.getUsers(page, limit, name);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
        // return res.status(500).json(error);
    }
};

export const statistic = async (req, res) => {
    try {
        // const { page, limit } = req.body;
        const response = await adminServices.statistic();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
        // return res.status(500).json(error);
    }
};
