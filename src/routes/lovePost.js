import express from "express";
import { verifyToken } from "../middlewares/verify_token";
import * as controllers from "../controllers/lovePost";
const router = express.Router();

router.use(verifyToken);
router.get("/", controllers.getLovePost);
router.post("/delete", controllers.deleted);
router.post("/create", controllers.created);

module.exports = router;
