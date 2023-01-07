import db from "../models";
import { Op } from "sequelize";
export const getPosts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await db.Post.findAll({
                raw: true,
                nest: true,
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
                        model: db.User,
                        as: "userData",
                        attributes: ["name", "phone", "zalo", "avatar"],
                    },
                ],
                attributes: ["id", "title", "star", "address", "description"],
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

export const getPostsLimit = ({ page = 0, priceNumber, areaNumber, limit, ...query }) => {
    console.log(">> priceNumber" + priceNumber);
    console.log(">> areaNumber" + areaNumber);
    return new Promise(async (resolve, reject) => {
        try {
            const lastQuery = { ...query };
            // console.log(page);
            const queries = {
                offset: ((+page || +page - 1) <= 1 ? 0 : +page - 1) * +process.env.LIMIT,
                limit: +limit || +process.env.LIMIT,
            };
            if (priceNumber) {
                lastQuery.priceNumber = { [Op.between]: priceNumber };
            }
            if (areaNumber) {
                lastQuery.areaNumber = { [Op.between]: areaNumber };
            }
            const res = await db.Post.findAndCountAll({
                raw: true,
                nest: true,
                ...queries,
                where: lastQuery,
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
                        model: db.User,
                        as: "userData",
                        attributes: ["name", "phone", "zalo", "avatar"],
                    },
                ],
                attributes: ["id", "title", "star", "address", "description"],
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

export const getNewPosts = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await db.Post.findAll({
                raw: true,
                nest: true,
                offset: 1,
                order: [["createdAt", "DESC"]],
                limit: +process.env.LIMIT,
                include: [
                    {
                        model: db.ImagePost,
                        as: "imagesData",
                        attributes: ["images"],
                    },
                    {
                        model: db.Attribute,
                        as: "attributesData",
                        attributes: ["price"],
                    },
                ],
                attributes: ["id", "title", "star", "createdAt"],
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
