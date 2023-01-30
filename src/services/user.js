import db from "../models";

export const getOne = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { id: userId },
                raw: true,
                nest: true,
                // order: ["order", "ASC"],
                attributes: {
                    exclude: ["password", "roleCode", "refreshToken"],
                },
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

export const updateUser = (userId, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId },
            });
            if (user) {
                const res = await db.User.update(body, {
                    where: { id: userId },
                });
                resolve({
                    err: res > 0 ? 0 : 1,
                    msg: res > 0 ? "Updated successfully" : "updated error",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const getLovePosts = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.User.findAll({
                where: { id: userId },
                include: [
                    {
                        model: db.Post,
                        as: "userPosts",
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
                                model: db.Label,
                                as: "labelData",
                                attributes: ["code", "value"],
                            },
                        ],
                        attributes: [
                            "id",
                            "title",
                            "star",
                            "address",
                            "description",
                            "categoryCode",
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
                        through: {
                            attributes: [],
                        },
                    },
                ],
                attributes: [],
            });
            resolve({
                err: 0,
                msg: "Successful get love posts",
                data: data[0]?.userPosts,
            });
        } catch (error) {
            reject(error);
        }
    });
};
