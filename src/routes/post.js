import express from "express";
import * as controllers from "../controllers/post";
const router = express.Router();

router.get("/", controllers.getPosts);

export default router;
