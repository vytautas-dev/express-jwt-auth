import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User";
import { hashPassword, validPassword } from "../utils/hashPassword";
import { IUser } from "../types/types";
import { generateRefreshToken, generateToken } from "../utils/generateToken";

// @route    POST api/auth/register
// @desc     Create user
// @access   Public

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password }: IUser = req.body;

  //  if any field is empty
  if (!username || !email || !password)
    res.status(400).json({ message: "Please add all fields" });

  // Check if user exists
  const userExists = await User.findOne({ email }); //
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  // Hash password
  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @route    POST api/auth/login
// @desc     Create user
// @access   Public

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: IUser = req.body;

  try {
    //  if any field is empty
    if (!email || !password)
      res.status(400).json({ message: "Please add all fields" });

    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ message: "User not exists" });

    const id = user!._id.toString();

    const isValid = await validPassword(password, user!.password);

    if (isValid) {
      const accessToken = generateToken(id);
      const refreshToken = generateRefreshToken(id);
      user!.refreshToken = refreshToken;
      await user!.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, //1d
      });

      res.status(201).json({ email, accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  // Is refreshToken in db?
  const user = await User.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    console.log("Cannot find a user, clear only cookie");
    return res.sendStatus(204);
  }
  console.log("find a user, clear refresh token and cookie");
  user.refreshToken = "";
  const result = await user.save();
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.sendStatus(204);
};

export default { registerUser, loginUser, logoutUser };
