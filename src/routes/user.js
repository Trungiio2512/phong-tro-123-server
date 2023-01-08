import express from "express";
import verifyToken from "../middlewares/verify_token";
import * as controllers from "../controllers/user";
const router = express.Router();

router.use(verifyToken);
router.get("/get_current_user", controllers.getCurrent);

export default router;
