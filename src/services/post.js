import db from "../models";
import { Op } from "sequelize";
import { v4 } from "uuid";
import generateCode from "../untils/generateCode";
import generateDate from "../untils/generateDate";
import moment from "moment";
require("dotenv").config();

export const getPostsLimit = ({ page, priceNumber, order, areaNumber, limit, ...query }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const lastQuery = { ...query };
      // console.log(page);
      const queries = {
        offset: ((+page || +page - 1) <= 1 ? 0 : +page - 1) * +process.env.LIMIT,
        limit: +limit || +process.env.LIMIT,
      };
      if (order) {
        queries.order = [order];
      }
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
          {
            model: db.Label,
            as: "labelData",
            attributes: ["code", "value"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description", "categoryCode"],
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

export const getPost = (postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(first)
      const res = await db.Post.findOne({
        raw: true,
        nest: true,
        where: { id: postId },
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
          {
            model: db.Label,
            as: "labelData",
            attributes: ["code", "value"],
          },
          {
            model: db.Overview,
            as: "overviews",
            // attributes: ["name", "phone", "zalo", "avatar"],
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

export const getNewPosts = ({ limit, order, ...query }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let oders = [["updatedAt", "DESC"]];
      if (order) {
        oders.push(order);
      }
      // console.log(limit);
      const res = await db.Post.findAll({
        raw: true,
        nest: true,
        where: query,
        order: oders,
        limit: +limit || +process.env.LIMIT,
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
            model: db.Label,
            as: "labelData",
            attributes: ["code", "value"],
          },
        ],
        attributes: ["id", "title", "star", "updatedAt", "categoryCode"],
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

//Private Methods
export const createNewPost = (id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const currentDate = new Date();
      const objDate = generateDate();
      const user = await db.User.findOne({ where: { id } });
      if (user) {
        const attributesId = v4();
        const imagesId = v4();
        const overviewId = v4();
        const labelCode = generateCode(body.label);
        const provinceCode = body.province.includes("Thành phố")
          ? generateCode(body.province.replace("Thành phố ", ""))
          : generateCode(body.province.replace("Tỉnh ", ""));
        const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
        await db.Post.create({
          id: v4(),
          title: body?.title,
          star: 0,
          labelCode,
          address: body.address,
          categoryCode: body.categoryCode,
          description: JSON.stringify(body.description),
          userId: id,
          overviewId,
          imagesId,
          attributesId,
          areaCode: body.areaCode,
          priceCode: body.priceCode,
          provinceCode,
          priceNumber: body.priceNumber,
          areaNumber: body.areaNumber,
        });
        await db.Attribute.create({
          id: attributesId,
          price: `${
            +body.priceNumber >= 1
              ? `${body.priceNumber} triệu/tháng`
              : `${body.priceNumber * Math.pow(10, 6)} đồng/tháng`
          }`,
          acreage: `${body.areaNumber}m2`,
          published: moment(new Date()).format("DD/MM/YYYY"),
          hashtag,
        });

        await db.ImagePost.create({
          id: imagesId,
          images: JSON.stringify(body?.images),
        });

        await db.Overview.create({
          id: overviewId,
          code: hashtag,
          area: body.label,
          // type: body.category,
          target: body.target,
          bonus: "Tin thường",
          created: objDate.today,
          expired: body.expired,
        });

        await db.Province.findOrCreate({
          where: {
            [Op.or]: [
              { value: body.province.replace("Thành phố ", "") },
              { value: body.province.replace("Tỉnh ", "") },
            ],
          },
          defaults: {
            code: provinceCode,
            value: body.province.includes("Thành phố")
              ? body.province.replace("Thành phố ", "")
              : body.province.replace("Tỉnh ", ""),
          },
        });

        await db.Label.findOrCreate({
          where: { code: labelCode },
          defaults: {
            code: labelCode,
            value: body.label,
          },
        });
      }
      resolve({
        err: 0,
        msg: "Success",
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getPostPrivate = (userId, page, limit, title) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(userId);
      const newlimit = limit ? +limit : +process.env.LIMIT;
      const offsetpage = page && +page <= 1 ? 0 : +page - 1 * newlimit;
      const queries = {
        limit: newlimit,
        offset: offsetpage,
      };

      const query = { userId };

      if (title) {
        query.title = { [Op.substring]: title };
      }
      // console.log(query);
      const res = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
        ...queries,
        where: query,
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
            model: db.Overview,
            as: "overviews",
            attributes: {
              exclude: ["id"],
            },
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

export const updatePostPrivate = (id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const currentDate = new Date();
      const objDate = generateDate();
      const user = await db.User.findOne({ where: { id } });
      if (user) {
        const labelCode = generateCode(body.label);
        const provinceCode = body.province.includes("Thành phố")
          ? generateCode(body.province.replace("Thành phố ", ""))
          : generateCode(body.province.replace("Tỉnh ", ""));
        await db.Post.update(
          {
            title: body?.title,
            labelCode,
            address: body.address,
            categoryCode: body.categoryCode,
            description: JSON.stringify(body.description),
            areaCode: body.areaCode,
            priceCode: body.priceCode,
            provinceCode,
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber,
          },
          { where: { id: body.postId } },
        );

        await db.Attribute.update(
          {
            price: `${
              +body.priceNumber >= 1
                ? `${body.priceNumber} triệu/tháng`
                : `${body.priceNumber * Math.pow(10, 6)} đồng/tháng`
            }`,
            acreage: `${body.areaNumber}m2`,
          },
          { where: { id: body?.attributesId } },
        );

        await db.ImagePost.update(
          {
            images: JSON.stringify(body?.images),
          },
          { where: { id: body?.imagesId } },
        );

        await db.Overview.update(
          {
            type: body.category,
            area: body.label,

            expired: body.expired,
            target: body.target,
          },
          { where: { id: body.overviewId } },
        );

        await db.Province.findOrCreate({
          where: {
            [Op.or]: [
              { value: body.province.replace("Thành phố ", "") },
              { value: body.province.replace("Tỉnh ", "") },
            ],
          },
          defaults: {
            code: provinceCode,
            value: body.province.includes("Thành phố")
              ? body.province.replace("Thành phố ", "")
              : body.province.replace("Tỉnh ", ""),
          },
        });

        await db.Label.findOrCreate({
          where: { code: labelCode },
          defaults: {
            code: labelCode,
            value: body.label,
          },
        });
      }
      resolve({
        err: 0,
        msg: "Success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const deletePostPrivate = (id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const currentDate = new Date();
      const user = await db.User.findOne({ where: { id } });
      if (user) {
        const res = await db.Post.destroy({ where: { id: body.postId } });
        if (res > 0) {
          await db.Attribute.destroy({ where: { id: body.attributesId } });

          await db.ImagePost.destroy({ where: { id: body.imagesId } });
          await db.Overview.destroy({ where: { id: body.overviewId } });
          resolve({
            err: 0,
            msg: "Success",
            data: res,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
