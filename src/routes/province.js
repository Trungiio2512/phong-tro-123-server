import express from "express";
import * as controllers from "../controllers/province";
const router = express.Router();

router.get("/", controllers.getProvinces);

export default router;
