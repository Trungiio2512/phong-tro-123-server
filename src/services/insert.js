import db from "../models";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
require("dotenv").config();
import chothuecanho from "../../data/chothuecanho.json";
import chothuematbang from "../../data/chothuematbang.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import nhachothue from "../../data/nhachothue.json";
import generateCode from "../untils/generateCode";
const salt = bcrypt.genSaltSync(10);
const hashPassword = (pass) => bcrypt.hashSync(pass, salt);
const dataBody = nhachothue.body;

export const insert = () => {
    return new Promise(async (resolve, reject) => {
        try {
            dataBody.forEach(async (i) => {
                const id = v4();
                const attributesId = v4();
                const userId = v4();
                const overviewId = v4();
                const imageId = v4();
                const labelCode = generateCode(4);
                await db.Post.create({
                    id,
                    title: i?.header?.title,
                    star: i?.header?.star,
                    labelCode,
                    address: i?.header?.address,
                    attributesId,
                    categoryCode: "NCT",
                    description: JSON.stringify(i?.mainContent?.content),
                    userId,
                    overviewId,
                    imageId,
                });

                await db.Attribute.create({
                    id: attributesId,
                    price: i?.header?.attributes?.price,
                    acreage: i?.header?.attributes?.acreage,
                    published: i?.header?.attributes?.published,
                    hashtag: i?.header?.attributes?.price,
                });

                await db.ImagePost.create({
                    id: imageId,
                    images: JSON.stringify(i?.images),
                });

                await db.Label.create({
                    code: labelCode,
                    value: i?.header?.class?.classType,
                });

                await db.Overview.create({
                    id: overviewId,
                    code: i?.overview?.content.find((i) => i?.name == "Mã tin:")?.content,
                    area: i?.overview?.content.find((i) => i?.name == "Khu vực")?.content,
                    type: i?.overview?.content.find((i) => i?.name == "Loại tin rao:")?.content,
                    target: i?.overview?.content.find((i) => i?.name == "Đối tượng thuê:")?.content,
                    bonus: i?.overview?.content.find((i) => i?.name == "Gói tin:")?.content,
                    created: i?.overview?.content.find((i) => i?.name == "Ngày đăng:")?.content,
                    expried: i?.overview?.content.find((i) => i?.name == "Ngày hết hạn:")?.content,
                });

                await db.User.create({
                    id: userId,
                    name: i?.contact.content.find((i) => i?.name == "Liên hệ:")?.content,
                    phone: i?.contact.content.find((i) => i?.name == "Điện thoại:")?.content,
                    zalo: i?.contact.content.find((i) => i?.name == "Zalo")?.content,
                    roleCode: "R2",
                    password: hashPassword("123456"),
                });
            });

            resolve("ok");
        } catch (error) {
            reject(error);
        }
    });
};
