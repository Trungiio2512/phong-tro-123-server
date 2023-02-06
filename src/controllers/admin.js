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
export const getPosts = async (req, res) => {
  try {
    // console.log(id);
    const { page } = req.query;
    // console.log(req.query);
    if (!page) return badRequest(res, "missing page");

    const response = await adminServices.getPosts(req.query);
    // console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const getCategories = async (req, res) => {
  try {
    // console.log(id);
    const { page } = req.query;
    // console.log(req.query);
    if (!page) return badRequest(res, "missing page");

    const response = await adminServices.getCategories(req.query);
    // console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const createCategory = async (req, res) => {
  try {
    const { value, header, subheader } = req.body;
    if (!value || !header || !subheader) return badRequest(res, "Missing value input");
    const response = await adminServices.createCategory(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
    // return res.status(500).json(error);
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return badRequest(res, "Missing value input");
    const response = await adminServices.deleteCategory(code);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
    // return res.status(500).json(error);
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { code, value, header, subheader } = req.body;
    if (!code || !value || !header || !subheader) return badRequest(res, "Missing value input");
    // console.log(req.body);

    const response = await adminServices.updateCategory(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
    // return res.status(500).json(error);
  }
};
