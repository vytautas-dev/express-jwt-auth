import express from "express";
import controller from "../controllers/Product";
import { auth, isAdminAuth } from "../middlewares/auth";

const router = express.Router();

router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);

router.post("/", auth, isAdminAuth, controller.createProduct);
router.put("/:id", auth, isAdminAuth, controller.updateProduct);
router.delete("/:id", auth, isAdminAuth, controller.deleteProduct);

export default router;
