import db from "../models";
require("dotenv").config();
import { Op } from "sequelize";
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
