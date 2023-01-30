import express from "express";
import cors from "cors";
import initRoutes from "./src/routes";
import connection from "./config_database";
// import { getNumberInString } from "./src/untils/common";
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(cookieParser());
app.use(
    cors({
        // origin: process.env.CLIENT_URL,
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        // optionsSuccessStatus: 200,
    }),
);
// app.use(function (req, res, next) {
//     res.header("Content-Type", "application/json;charset=UTF-8");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

initRoutes(app);
connection();

const port = process.env.PORT || 8888;

const listeners = app.listen(port, () => console.log(`Listen on ${listeners.address().port}`));
