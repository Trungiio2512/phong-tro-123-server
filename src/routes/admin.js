import express from "express";
import * as controllers from "../controllers/admin";
import { verifyRoleAdmin } from "../middlewares/verify_role";
import { verifyToken } from "../middlewares/verify_token";
const router = express.Router();
router.use(verifyToken);
router.use(verifyRoleAdmin);
router.get("/users", controllers.getUsers);
router.get("/", controllers.statistic);
router.post("/delete_user", controllers.deleteUser);
router.post("/change_role", controllers.changeRoleUser);

export default router;
