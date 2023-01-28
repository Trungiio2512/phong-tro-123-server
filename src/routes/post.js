import express from "express";
import * as controllers from "../controllers/post";
import { verifyRoleCreatorOrAdmin } from "../middlewares/verify_role";
import { verifyToken } from "../middlewares/verify_token";
const router = express.Router();

router.get("/", controllers.getPost);
router.get("/limit", controllers.getPostsLimit);
router.get("/new_post", controllers.getNewPosts);

router.use(verifyToken);
router.use(verifyRoleCreatorOrAdmin);
router.get("/posts_private", controllers.getPostPrivate);
router.post("/create", controllers.createNewPost);
router.put("/update", controllers.updatePostPrivate);
router.delete("/delete", controllers.deletePostPrivate);

export default router;
