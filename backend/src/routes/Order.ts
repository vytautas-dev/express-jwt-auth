import express from "express";
import controller from "../controllers/Order";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/", auth, controller.createOrder);
// router.get("/:id", controller.getOrder);
// router.put("/:id", controller.updateOrder);
// router.delete("/delete", controller.deleteOrder);

export default router;
