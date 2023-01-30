import { notFound } from "../middlewares/http_errors";
import auth from "./auth";
import insert from "./insert";
import category from "./category";
import post from "./post";
import price from "./price";
import area from "./area";
import province from "./province";
import user from "./user";
import lovePost from "./lovePost";
import admin from "./admin";

const initRoutes = (app) => {
    app.use("/api/v1/auth", auth);
    app.use("/api/v1/insert", insert);
    app.use("/api/v1/category", category);
    app.use("/api/v1/post", post);
    app.use("/api/v1/price", price);
    app.use("/api/v1/area", area);
    app.use("/api/v1/province", province);
    app.use("/api/v1/user", user);
    app.use("/api/v1/love_post", lovePost);
    app.use("/api/v1/admin", admin);
    app.use(notFound);
};

export default initRoutes;
