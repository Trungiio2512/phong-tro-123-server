import express from "express";
import * as controllers from "../controllers/registerPost";
import { verifyRoleCreatorOrAdmin } from "../middlewares/verify_role";
import { verifyToken } from "../middlewares/verify_token";
const router = express.Router();
router.use(verifyToken);
router.get("/", controllers.getRegisterPosts);
router.use(verifyRoleCreatorOrAdmin);
router.post("/add", controllers.created);
router.post("/delete", controllers.deleted);

module.exports = router;
