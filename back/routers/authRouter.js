import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleWare from "../middlewares/middleWare.js";

const router = new Router();

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.get("/check", authController.checkAuth);

export default router;
