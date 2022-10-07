import express from "express";
import passport from "passport";
import controller from "../controllers/Special";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.special
);

export default router;
