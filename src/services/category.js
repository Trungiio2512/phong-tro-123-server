import db from "../models";

//GET ALL Categories

export const getCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
        // attributes: ["id", "code", "value"],
      });
      resolve({
        err: response ? 0 : 2,
        msg: response ? "Successfully" : "Error while getting category",
        data: response,
      });
    } catch (error) {
      reject(error);
    }
  });
};
