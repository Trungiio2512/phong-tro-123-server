import { notFound } from "../middlewares/http_errors";
import auth from "./auth";
const initRoutes = (app) => {
    app.use("/api/v1/auth", auth);
    app.use(notFound);
};

export default initRoutes;
