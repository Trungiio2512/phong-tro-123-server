import express from "express";

import * as controllers from "../controllers/auth";
import { verifyRefreshToken } from "../middlewares/verify_token";
const router = express.Router();

router.post("/register", controllers.register);
router.post("/login", controllers.login);

router.use(verifyRefreshToken);
router.post("/refresh", controllers.refresh);
export default router;
