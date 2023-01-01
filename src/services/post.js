import db from "../models";

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

export const getPostsLimit = (page = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(page);
            const res = await db.Post.findAndCountAll({
                raw: true,
                nest: true,
                offset: +page,
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
