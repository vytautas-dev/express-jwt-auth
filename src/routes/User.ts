import express from "express";
import controller from "../controllers/User";

const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);

export default router;
