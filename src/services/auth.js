import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);
const hashPassword = (pass) => bcrypt.hashSync(pass, salt);

const generateAccessToken = (data) =>
    jwt.sign(data, process.env.JWT_ACCESS_KEY, { expiresIn: "1d" });

const generateRefreshToken = (data) =>
    jwt.sign(data, process.env.JWT_REFRESH_KEY, { expiresIn: "30d" });

export const register = ({ name, phone, password, type }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userId = v4();
            const response = await db.User.findOrCreate({
                where: { phone },
                defaults: {
                    id: userId,
                    name,
                    phone,
                    zalo: phone,
                    roleCode: type,
                    password: hashPassword(password),
                },
            });
            const accessToken = response[1]
                ? generateAccessToken({
                      id: response[0].id,
                      phone: response[0].phone,
                      roleCode: response[0].roleCode,
                  })
                : null;

            const refreshToken = response[1]
                ? generateRefreshToken({
                      id: response[0].id,
                      phone: response[0].phone,
                      roleCode: response[0].roleCode,
                  })
                : null;

            resolve({
                err: accessToken ? 0 : 2,
                msg: accessToken ? "Register success" : "Phone number has been registered",
                accessToken,
                refreshToken,
                // data: response,
            });

            if (refreshToken) {
                await db.User.update(
                    { refreshToken },
                    {
                        where: userId,
                    },
                );
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const login = ({ phone, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { phone },
                raw: true,
            });
            const hasPass = response && bcrypt.compareSync(password, response.password);

            const token = hasPass
                ? generateAccessToken({
                      id: response.id,
                      phone: response.phone,
                      roleCode: response.roleCode,
                  })
                : null;
            const refreshToken = hasPass
                ? generateRefreshToken({
                      id: response.id,
                      roleCode: response.roleCode,
                      phone: response.phone,
                  })
                : null;

            resolve({
                err: token ? 0 : 2,
                msg: token
                    ? "Login success"
                    : response
                    ? "Password is wrong"
                    : "Phone number is incorrect",
                accessToken: token,
                refreshToken,
                // data: response,
            });
            if (refreshToken) {
                db.User.update(
                    { refreshToken },
                    {
                        where: { phone },
                    },
                );
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const refresh = (id, refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await db.User.findOne({ where: { id } });
            if (res) {
                jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, data) => {
                    if (err) {
                        resolve({
                            err: 1,
                            mess: "Refresh token is expried.Login again",
                        });
                    } else {
                        const newAccessToken = jwt.sign(
                            { id: res.id, phone: res.phone, roleCode: res.roleCode },
                            process.env.JWT_ACCESS_KEY,
                            { expiresIn: "1d" },
                        );
                        const newRefreshToken = jwt.sign(
                            { id: res.id, phone: res.phone, roleCode: res.roleCode },
                            process.env.JWT_REFRESH_KEY,
                            { expiresIn: "30d" },
                        );
                        resolve({
                            err: newAccessToken ? 0 : 1,
                            mess: newAccessToken ? "sucessfully" : "Cannot generate token",
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken,
                        });
                        if (refreshToken) {
                            db.User.update(
                                { refreshToken: newRefreshToken },
                                { where: { id: res.id } },
                            );
                        }
                    }
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
