import express from "express";
import { verifyToken } from "../middlewares/verify_token";
import { verifyRoleCreatorOrAdmin } from "../middlewares/verify_role";
import * as controllers from "../controllers/user";
const router = express.Router();

router.use(verifyToken);
router.get("/get_current_user", controllers.getCurrent);
router.get("/love_posts", controllers.getLovePosts);
router.get("/register_posts", controllers.getRegisterPosts);
router.put("/update_user", controllers.updateUser);
router.use(verifyRoleCreatorOrAdmin);
router.get("/users_register_post", controllers.getUsersRegisterPost);

export default router;
