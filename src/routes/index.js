import { notFound } from "../middlewares/http_errors";
import auth from "./auth";
import insert from "./insert";
const initRoutes = (app) => {
    app.use("/api/v1/auth", auth);
    app.use("/api/v1/insert", insert);
    app.use(notFound);
};

export default initRoutes;
