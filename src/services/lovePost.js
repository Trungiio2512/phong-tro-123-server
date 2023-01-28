import db from "../models";
import { v4 as uuidv4 } from "uuid";
const { Op } = require("sequelize");
export const getLovePost = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await db.LovePost.findAll({
                where: { userId },
                attributes: ["id", "postId"],
            });
            resolve({
                err: res ? 0 : 1,
                msg: res ? "Get post successfully" : "Get Post failed",
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
            const res = await db.LovePost.destroy({ where: { userId, postId } });
            resolve({
                err: res > 0 ? 0 : 1,
                msg: res > 0 ? "Deleted love post successfully" : "Deleted love post failed",
            });
        } catch (error) {
            reject(error);
        }
    });
};
export const created = (userId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [hasLove, created] = await db.LovePost.findOrCreate({
                where: {
                    [Op.and]: [{ userId }, { postId }],
                },
                defaults: {
                    userId,
                    postId,
                },
            });
            // console.log(userId, postId);
            // const { id, userId, postId } = hasLove;
            resolve({
                err: created ? 0 : 1,
                msg: created ? "Create love post successfully" : "Create love post failed",
                data: created ? { id: hasLove.id, postId: hasLove.postId } : {},
            });

            // resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};
