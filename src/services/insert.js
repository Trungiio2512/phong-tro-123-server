import db from "../models";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import { Op } from "sequelize";
require("dotenv").config();

import chothuecanho from "../../data/chothuecanho.json";
import chothuematbang from "../../data/chothuematbang.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import nhachothue from "../../data/nhachothue.json";
import generateCode from "../untils/generateCode";
import { dataPrice, dataArea } from "../untils/data";
import { getNumberInString, getNumberInStringV2 } from "../untils/common";

const salt = bcrypt.genSaltSync(10);
const hashPassword = (pass) => bcrypt.hashSync(pass, salt);
const dataBody = [
  {
    body: chothuephongtro.body,
    code: "CTPT",
  },
  {
    body: chothuematbang.body,
    code: "CTMB",
  },
  {
    body: chothuecanho.body,
    code: "CTCH",
  },
  {
    body: nhachothue.body,
    code: "NCT",
  },
];

const dataCategory = [
  {
    code: "CTCH",
    value: "Cho thuê căn hộ",
    header: "Cho Thuê Căn Hộ Chung Cư, Giá Rẻ, Mới Nhất 2022",
    subheader:
      "Cho thuê căn hộ - Kênh đăng tin cho thuê căn hộ số 1: giá rẻ, chính chủ, đầy đủ tiện nghi. Cho thuê chung cư với nhiều mức giá, diện tích cho thuê khác nhau.",
  },
  {
    code: "CTMB",
    value: "Cho thuê mặt bằng",
    header: "Cho Thuê Mặt Bằng, Cho Thuê Văn Phòng, Cửa Hàng, Kiot, Mới Nhất 2022",
    subheader:
      "Cho thuê mặt bằng - Kênh đăng tin cho thuê mặt bằng, cho thuê cửa hàng, cho thuê kiot số 1: giá rẻ, mặt tiền, khu đông dân cư, phù hợp kinh doanh.",
  },
  {
    code: "CTPT",
    value: "Cho thuê phòng trọ",
    header: "Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2022",
    subheader:
      "Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2022. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.",
  },
  {
    code: "NCT",
    value: "Nhà cho thuê",
    header: "Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất 2022",
    subheader:
      "Cho thuê nhà nguyên căn - Kênh đăng tin cho thuê nhà số 1: giá rẻ, chính chủ, miễn trung gian, đầy đủ tiện nghi, mức giá, diện tích cho thuê khác nhau.",
  },
];

const dataRole = [
  {
    code: "R1",
    value: "admin",
  },
  {
    code: "R2",
    value: "creator",
  },
  {
    code: "R3",
    value: "user",
  },
];

export const insert = () =>
  new Promise(async (resolve, reject) => {
    try {
      // const provinceCodes = [];
      const provinceCodes = [];
      const labelCodes = [];
      const userlist = [];

      await db.Category.bulkCreate(dataCategory);
      await db.Role.bulkCreate(dataRole);

      dataPrice.forEach(async (price, index) => {
        await db.Price.create({
          order: index + 1,
          code: price.code,
          value: price.value,
        });
      });
      dataArea.forEach(async (area, index) => {
        await db.Area.create({
          order: index + 1,
          code: area.code,
          value: area.value,
        });
      });
      dataBody.forEach((cate) => {
        cate.body.forEach(async (item) => {
          let postId = v4();
          let userId = v4();
          let labelCode = generateCode(item?.header?.class?.classType).trim();
          let provinceCode = generateCode(item?.header?.address?.split(",")?.slice(-1)[0]).trim();

          labelCodes?.every((item) => item?.code !== labelCode) &&
            labelCodes.push({
              code: labelCode,
              value: item?.header?.class?.classType?.trim(),
            });
          provinceCodes?.every((item) => item?.code !== provinceCode) &&
            provinceCodes.push({
              code: provinceCode,
              value: item?.header?.address?.split(",")?.slice(-1)[0].trim(),
            });

          userlist.every(
            (user) =>
              user?.phone !== item?.contact?.content.find((i) => i.name === "Điện thoại:")?.content,
          ) &&
            userlist.push({
              id: userId,
              name: item?.contact?.content.find((i) => i.name === "Liên hệ:")?.content,
              password: hashPassword("123456"),
              phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")?.content,
              zalo: item?.contact?.content.find((i) => i.name === "Zalo")?.content,
              avatar:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
              roleCode: "R2",
            });
          const currentArea = getNumberInString(item?.header?.attributes?.acreage);
          const currentPrice = getNumberInString(item?.header?.attributes?.price);
          let attributesId = v4();
          let imagesId = v4();
          let overviewId = v4();
          let desc = JSON.stringify(item?.mainContent?.content);

          await db.Post1.create({
            id: postId,
            title: item?.header?.title,
            star: item?.header?.star,
            labelCode,
            address: item?.header?.address,
            attributesId,
            categoryCode: cate.code,
            description: desc,
            userId,
            overviewId,
            imagesId,
            areaCode: dataArea.find((area) => area.max > currentArea && area.min <= currentArea)
              ?.code,
            priceCode: dataPrice.find((area) => area.max > currentPrice && area.min <= currentPrice)
              ?.code,
            provinceCode,
            priceNumber: getNumberInStringV2(item?.header?.attributes?.price),
            areaNumber: getNumberInStringV2(item?.header?.attributes?.acreage),
          });
          await db.Attribute.create({
            id: attributesId,
            price: item?.header?.attributes?.price,
            acreage: item?.header?.attributes?.acreage,
            published: item?.header?.attributes?.published,
            hashtag: item?.header?.attributes?.hashtag,
          });

          await db.Province.findOrCreate({
            where: { code: provinceCode },
            defaults: {
              code: provinceCode,
              value: item?.header?.address?.split(",")?.slice(-1)[0].trim(),
            },
          });
          await db.ImagePost.create({
            id: imagesId,
            images: JSON.stringify(item?.images),
          });
          await db.Overview.create({
            id: overviewId,
            code: item?.overview?.content.find((i) => i.name === "Mã tin:")?.content,
            area: item?.overview?.content.find((i) => i.name === "Khu vực")?.content,
            type: item?.overview?.content.find((i) => i.name === "Loại tin rao:")?.content,
            target: item?.overview?.content.find((i) => i.name === "Đối tượng thuê:")?.content,
            bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")?.content,
            created: item?.overview?.content.find((i) => i.name === "Ngày đăng:")?.content,
            expired: item?.overview?.content.find((i) => i.name === "Ngày hết hạn:")?.content,
          });
        });
      });
      // console.log(provinceCodes);
      provinceCodes?.forEach(async (item) => {
        await db.Province.create(item);
      });
      labelCodes?.forEach(async (item) => {
        await db.Label.create(item);
      });
      userlist?.forEach(async (user) => {
        await db.User.create(user);
      });

      resolve("Done.");
    } catch (error) {
      reject(error);
    }
  });
export const createPricesAndAreas = () => {
  return new Promise(async (resolve, reject) => {
    try {
      dataPrice.forEach(async (price, index) => {
        await db.Price.create({
          order: index + 1,
          code: price.code,
          value: price.value,
        });
      });
      dataArea.forEach(async (area, index) => {
        await db.Area.create({
          order: index + 1,
          code: area.code,
          value: area.value,
        });
      });
      resolve("ok");
    } catch (error) {
      reject(error);
    }
  });
};
