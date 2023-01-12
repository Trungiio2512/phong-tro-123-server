import { authorization, requestTimeout } from "./http_errors";

export const verifyRoleUser = (req, res, next) => {
    const { roleCode } = req.user;
    if (roleCode !== "R3") {
        return requestTimeout(res, "You are not allowed to access this");
    }
    next();
};

export const verifyRoleCreator = (req, res, next) => {
    const { roleCode } = req.user;
    if (roleCode !== "R2") {
        return requestTimeout(res, "You are not allowed to access this");
    }
    next();
};
export const verifyRoleAdmin = (req, res, next) => {
    const { roleCode } = req.user;
    if (roleCode !== "R1") {
        return requestTimeout(res, "You are not allowed to access this");
    }
    next();
};

export const verifyRoleCreatorOrAdmin = (req, res, next) => {
    const { roleCode } = req.user;
    if (roleCode !== "R1" && roleCode !== "R2") {
        return requestTimeout(res, "You are not allowed to access this");
    }
    next();
};
