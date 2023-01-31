import { badRequest, internalServerError } from "../middlewares/http_errors";
import * as adminServices from "../services/admin";

export const getUsers = async (req, res) => {
  try {
    const { page, limit, name } = req.query;
    // console.log(req.query);
    const response = await adminServices.getUsers(page, limit, name);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
    // return res.status(500).json(error);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log(req.query);
    const response = await adminServices.deleteUser(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
    // return res.status(500).json(error);
  }
};
export const changeRoleUser = async (req, res) => {
  try {
    const { id, roleCode } = req.body;
    // console.log(req.query);
    if (!id || !roleCode) return badRequest(res, "missing id or role code");
    const response = await adminServices.changeRole(id, roleCode);
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
