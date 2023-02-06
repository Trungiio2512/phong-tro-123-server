import express from "express";
import * as controllers from "../controllers/admin";
import { verifyRoleAdmin } from "../middlewares/verify_role";
import { verifyToken } from "../middlewares/verify_token";
const router = express.Router();
router.use(verifyToken);
router.use(verifyRoleAdmin);
router.get("/users", controllers.getUsers);
router.get("/", controllers.statistic);
router.get("/posts", controllers.getPosts);
router.post("/delete_user", controllers.deleteUser);
router.post("/change_role", controllers.changeRoleUser);
router.get("/categories", controllers.getCategories);
router.post("/create_category", controllers.createCategory);
router.delete("/delete_category", controllers.deleteCategory);
router.put("/update_category", controllers.updateCategory);

export default router;
