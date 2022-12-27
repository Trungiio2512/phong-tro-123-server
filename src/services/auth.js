import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);
const hashPassword = (pass) => bcrypt.hashSync(pass, salt);

const generateAccessToken = (data) =>
    jwt.sign(data, process.env.JWT_ACCESS_KEY, { expiresIn: "15s" });

const generateRefreshToken = (data) =>
    jwt.sign(data, process.env.JWT_REFRESH_KEY, { expiresIn: "30d" });

export const register = ({ name, phone, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOrCreate({
                where: { phone },
                defaults: {
                    id: v4(),
                    name,
                    phone,
                    password: hashPassword(password),
                },
            });
            const accessToken = response[1]
                ? generateAccessToken({ id: response[0].id, phone: response[0].phone })
                : null;

            const refreshToken = response[1]
                ? generateRefreshToken({ id: response[0].id, phone: response[0].phone })
                : null;

            resolve({
                err: accessToken ? 0 : 2,
                mess: accessToken
                    ? "Register success"
                    : "Phone number has been registered",
                accessToken,
                refreshToken,
            });
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
            const hasPass = bcrypt.compareSync(password, response.password);

            const token = hasPass
                ? generateAccessToken({ id: response.id, phone: response.phone })
                : null;
            const refreshToken = hasPass
                ? generateRefreshToken({ id: response.id, phone: response.phone })
                : null;

            resolve({
                err: token ? 0 : 2,
                mess: token
                    ? "Login success"
                    : response
                    ? "Password is wrong"
                    : "Phone number is incorrect",
                accessToken: token,
                refreshToken,
            });
        } catch (error) {
            reject(error);
        }
    });
};
