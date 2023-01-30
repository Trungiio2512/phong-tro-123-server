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

            console.log(queries);

            const response = await db.User.findAndCountAll({
                raw: true,
                nest: true,
                // order: ["order", "ASC"],
                ...queries,
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
