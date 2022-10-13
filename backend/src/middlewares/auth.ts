import passport from "passport";
import { NextFunction, Request, Response } from "express";

// passport authentication
export const auth = passport.authenticate("jwt", { session: false });

let refreshTokens = [];

// middleware checking if user is admin
export const isAdminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdmin = req.user?.isAdmin;

  if (req.user && isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
