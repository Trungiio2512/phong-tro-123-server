import db from "../models";

//GET ALL Area

export const getAreas = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.Area.findAll({
                raw: true,
                // order: ["order", "ASC"],
                attributes: ["id", "code", "value", "order"],
            });
            resolve({
                err: response ? 0 : 2,
                msg: response ? "Successfully" : "Error while getting Area",
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};
