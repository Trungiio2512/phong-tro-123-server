import createError from "http-errors";

export const badRequest = (res, err) => {
    const error = createError.BadRequest(err);
    return res.status(error.status).json({
        err: 1,
        mess: error.message,
    });
};

export const internalServerError = (res) => {
    const error = createError.InternalServerError();
    return res.status(error.status).json({
        err: -1,
        mess: error.message,
    });
};

export const notFound = (req, res) => {
    const error = createError.NotFound("Router is not exists");
    return res.status(error.status).json({
        err: 1,
        mess: error.message,
    });
};
