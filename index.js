import express from "express";
import cors from "cors";
import initRoutes from "./src/routes";
import connection from "./config_database";

require("dotenv").config();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
connection();

const port = process.env.PORT || 8888;

const listeners = app.listen(port, () =>
    console.log(`Listen on ${listeners.address().port}`),
);
