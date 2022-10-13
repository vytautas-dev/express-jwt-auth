import { Request, Response } from "express";
import User from "../models/User";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken";

const refreshJwtSecret = process.env.REFRESH_JWT_SECRET;

const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(403); //Forbidden

  // evaluate jwt
  jwt.verify(refreshToken, refreshJwtSecret, (err, decoded) => {
    if (err || user._id.toString() !== decoded.id) return res.sendStatus(403);

    const accessToken = generateToken(user._id.toString());

    res.json({ accessToken });
  });
};

export default { refreshToken };
