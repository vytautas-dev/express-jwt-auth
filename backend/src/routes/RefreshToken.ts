import express from "express";
import controller from "../controllers/RefreshToken";

const router = express.Router();

router.get("/", controller.refreshToken);

export default router;
