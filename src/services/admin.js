import db from "../models";
require("dotenv").config();
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
export const statistic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = db.User.count();
      const post = db.Post.count();
      const province = db.Province.count();
      const category = db.Category.count();
      const [countUser, countPost, countProvince, countCategory] = await Promise.all([
        user,
        post,
        province,
        category,
      ]);
      resolve({
        err: 0,
        msg: "Successfully",
        data: [
          { name: "Số lượng tài khoản", count: countUser },
          { name: "Số lượng bài đăng ", count: countPost },
          { name: "Số lượng khu vực", count: countProvince },
          { name: "Số lượng danh mục", count: countCategory },
        ],
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getUsers = (page, limit, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const lastLimit = limit ? +limit : +process.env.LIMIT;
      let lastOffet = page ? (+page <= 1 ? 0 : (+page - 1) * lastLimit) : 0;

      const queries = {
        offset: lastOffet,
        limit: lastLimit,
      };
      const query = {};
      if (name) {
        query.name = { [Op.substring]: name };
      }
      // console.log(queries);

      const response = await db.User.findAndCountAll({
        raw: true,
        nest: true,
        order: [["createdAt", "DESC"]],
        ...queries,
        where: query,
        attributes: ["id", "name"],
        include: [
          {
            model: db.Role,
            as: "userRole",
            attributes: ["id", "code", "value"],
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Successfully" : "Error while getting price",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Delete successfully" : "Error while delete user",
        // data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const changeRole = (id, roleCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(
        { roleCode },
        {
          where: { id },
        },
      );
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Thay đổi thành công" : "Thay đổi thất bại",
        // data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getPosts = ({ page, limit, title }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(userId);
      const newlimit = limit ? +limit : +process.env.LIMIT;
      const offsetpage = page && +page <= 1 ? 0 : (+page - 1) * newlimit;
      const queries = {
        limit: newlimit,
        offset: offsetpage,
      };
      // console.log(queries);
      const query = {};
      if (title) {
        query.title = { [Op.substring]: title };
      }
      // console.log(query);
      const res = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
        ...queries,
        where: query,
        include: [
          {
            model: db.ImagePost,
            as: "imagesData",
            attributes: ["images"],
          },
          {
            model: db.Attribute,
            as: "attributesData",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.Overview,
            as: "overviews",
            attributes: {
              exclude: ["id"],
            },
          },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "labelCode",
          "address",
          "attributesId",
          "categoryCode",
          "priceCode",
          "areaCode",
          "provinceCode",
          "description",
          // "userId",
          "overviewId",
          "imagesId",
          "priceNumber",
          "areaNumber",
        ],
      });
      resolve({
        err: res ? 0 : 1,
        msg: res ? "Success" : "Error",
        data: res,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const getCategories = ({ page, limit }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newlimit = limit ? +limit : +process.env.LIMIT;
      const offsetpage = page && +page <= 1 ? 0 : (+page - 1) * newlimit;
      const queries = {
        limit: newlimit,
        offset: offsetpage,
      };
      const { count, rows } = await db.Category.findAndCountAll({
        raw: true,
        queries,
        // attributes: ["id", "code", "value"],
      });
      resolve({
        err: 0,
        msg: "Successfully",
        data: {
          count,
          rows,
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const createCategory = ({ value, header, subheader }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Category.create({
        code: uuidv4(),
        value,
        header,
        subheader,
      });
      resolve({
        err: 0,
        msg: "Tạo thành công",
        data: res,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteCategory = (code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await db.Category.destroy({ where: { code } });
      resolve({
        err: count > 0 ? 0 : 2,
        msg: count > 0 ? "Xoá thành công" : "Xoá thất bại",
        // data: res,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const updateCategory = ({ code, value, header, subheader }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Category.update({ value, header, subheader }, { where: { code } });
      resolve({
        err: res[0] > 0 ? 0 : 2,
        msg: res[0] > 0 ? "Sửa thành công" : "Sửa thất bại",
        data: res,
      });
    } catch (error) {
      reject(error);
    }
  });
};
