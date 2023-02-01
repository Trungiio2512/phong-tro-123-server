import db from "../models";
import { Op } from "sequelize";
export const getRegisterPosts = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.RegisterPost.findAll({
        where: { userId },
        attributes: ["postId"],
      });
      resolve({
        err: 0,
        msg: "get Successfuly",
        data: res,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const deleted = (userId, postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(id);
      const res = await db.RegisterPost.destroy({
        where: {
          [Op.and]: [{ userId }, { postId }],
        },
      });
      resolve({
        err: res > 0 ? 0 : 1,
        msg: res > 0 ? "Huỷ đăng ký thành công" : "Huỷ đăng ký thất bại",
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const create = (userId, postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(id);
      const [hasRegister, created] = await db.RegisterPost.findOrCreate({
        where: {
          [Op.and]: [{ userId }, { postId }],
        },
        defaults: {
          userId,
          postId,
        },
      });
      resolve({
        err: created ? 0 : 1,
        msg: created ? "Đăng ký thành công" : "Đăng ký thất bại",
        // data: created ? { id: hasRegister.id, postId: hasRegister.postId } : {},
      });
    } catch (error) {
      reject(error);
    }
  });
};
