import express from "express";
import * as controllers from "../controllers/insert";
const router = express.Router();

router.post("/", controllers.insert);

export default router;
