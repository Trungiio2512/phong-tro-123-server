import { Op } from "sequelize";
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

export const getLovePosts = (userId, page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const lastLimit = limit ? +limit : +process.env.LIMIT;
      let lastOffet = page && +page <= 1 ? 0 : (+page - 1) * lastLimit;

      const queries = {
        offset: lastOffet,
        limit: lastLimit,
      };
      const { count, rows } = await db.User.findAndCountAll({
        where: { id: userId },
        ...queries,
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
              {
                model: db.User,
                as: "userData",
              },
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
        data: {
          count,
          rows: rows[0].userPosts,
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const getRegisterPosts = (userId, page, limit, title) => {
  return new Promise(async (resolve, reject) => {
    try {
      const lastLimit = limit ? +limit : +process.env.LIMIT;
      let lastOffet = page && +page <= 1 ? 0 : (+page - 1) * lastLimit;

      const queries = {
        offset: lastOffet,
        limit: lastLimit,
      };

      let search = {};
      if (title) {
        search.title = { [Op.substring]: title };
      }

      const { count, rows } = await db.User.findAndCountAll({
        where: {
          id: userId,
        },
        ...queries,
        include: [
          {
            model: db.Post,
            as: "userRegisterPosts",
            where: { ...search },
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
              {
                model: db.User,
                as: "userData",
                attributes: ["name", "phone", "zalo"],
              },
              {
                model: db.Overview,
                as: "overviews",
                attributes: ["expired"],
              },
            ],

            attributes: ["id", "title", "address"],
            through: {
              attributes: [],
            },
          },
        ],
        attributes: [],
      });
      resolve({
        err: 0,
        msg: "Successful get register posts",
        data: { count, rows: rows[0].userRegisterPosts },
      });
    } catch (error) {
      reject(error);
    }
  });
};
