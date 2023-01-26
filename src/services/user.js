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
                        as: "role",
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
