import express from "express";
import * as controllers from "../controllers/post";
import { verifyRoleCreatorOrAdmin } from "../middlewares/verify_role";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();

router.get("/all", controllers.getPosts);
router.get("/limit", controllers.getPostsLimit);
router.get("/new_post", controllers.getNewPosts);

router.use(verifyToken);
router.use(verifyRoleCreatorOrAdmin);
router.post("/create_post", controllers.createNewPost);

export default router;
