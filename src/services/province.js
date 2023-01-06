import db from "../models";

//GET ALL prices

export const getProvinces = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.Province.findAll({
                raw: true,
                // order: ["order", "ASC"],
                // attributes: ["id", "code", "value", "order"],
            });
            resolve({
                err: response ? 0 : 2,
                msg: response ? "Successfully" : "Error while getting price",
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};
