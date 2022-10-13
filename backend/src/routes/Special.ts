import express from "express";
import controller from "../controllers/Special";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.get("/", auth, controller.special);

export default router;
