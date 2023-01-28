import jwt, { TokenExpiredError } from "jsonwebtoken";
import { authorization } from "./http_errors";
require("dotenv").config();
export const verifyToken = (req, res, next) => {
    let accessToken = req.headers.authorization?.split(" ")[1];
    // console.log(accessToken);
    if (!accessToken) {
        return authorization(res, "Missing token");
    }

    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        const hasToken = err instanceof TokenExpiredError;
        // console.log(hasToken);
        if (err) {
            if (!hasToken) {
                return authorization(res, "Token is not valid");
            } else if (hasToken) {
                return authorization(res, "Token is expried");
            }
        }
        req.user = user;
        next();
    });
};

export const verifyRefreshToken = (req, res, next) => {
    let refreshToken = req.body;
    // console.log(refreshToken);
    if (!refreshToken) {
        return authorization(res, "Missing token");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        const hasToken = err instanceof TokenExpiredError;
        // console.log(hasToken);
        if (err) {
            if (!hasToken) {
                return authorization(res, "Token is not valid");
            } else if (hasToken) {
                return authorization(res, "Token is expried, you must be logged in");
            }
        }
        req.user = user;
        next();
    });
};
