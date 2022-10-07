import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User";
import { hashPassword, validPassword } from "../utils/password";

const jwtSecret = process.env.JWT_SECRET;

type TBody = {
  email: string;
  password: string;
};

const registerUser = async (req: Request<TBody>, res: Response) => {
  const { email, password } = req.body;

  //  if any field is empty
  if (!email || !password)
    res.status(400).json({ message: "Please add all fields" });

  // Check if user exists
  const userExists = await User.findOne({ email }); //
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  // Hash password
  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return res.status(201).json(newUser);
};

const loginUser = async (
  req: Request<TBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  //  if any field is empty
  if (!email || !password)
    res.status(400).json({ message: "Please add all fields" });

  const user = await User.findOne({ email });
  if (!user) res.status(400).json({ message: "User not exists" });

  const isValid = await validPassword(password, user!.password);
  if (isValid) res.status(201).json({ token: generateToken(user!._id) });
};

// Generate JWT
const generateToken = (id: string): string => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "30d",
  });
};

export default { registerUser, loginUser };
