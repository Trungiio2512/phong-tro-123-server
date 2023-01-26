import express from "express";
import cors from "cors";
import initRoutes from "./src/routes";
import connection from "./config_database";
import { getNumberInString } from "./src/untils/common";

require("dotenv").config();
getNumberInString("12 đồng/tháng");
const app = express();
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

initRoutes(app);
connection();

const port = process.env.PORT || 8888;

const listeners = app.listen(port, () => console.log(`Listen on ${listeners.address().port}`));
