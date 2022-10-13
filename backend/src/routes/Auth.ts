import express from "express";
import controller from "../controllers/Auth";

const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.get("/logout", controller.logoutUser);

export default router;
