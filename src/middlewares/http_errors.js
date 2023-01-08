import createError from "http-errors";

export const badRequest = (res, err) => {
    const error = createError.BadRequest(err);
    return res.status(error.status).json({
        err: 1,
        msg: error.message,
    });
};

export const authorization = (res, err) => {
    const error = createError.Unauthorized(err);
    return res.status(error.status).json({
        err: 1,
        msg: error.message,
    });
};

export const internalServerError = (res) => {
    const error = createError.InternalServerError();
    return res.status(error.status).json({
        err: -1,
        msg: error.message,
    });
};

export const notFound = (req, res) => {
    const error = createError.NotFound("Router is not exists");
    return res.status(error.status).json({
        err: 1,
        msg: error.message,
    });
};
