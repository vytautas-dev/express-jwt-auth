import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import Order from "../models/Order";
import { IOrder } from "../types/types";

// @route    POST api/orders
// @desc     Create product
// @access   Private

const createOrder = async (req: Request, res: Response) => {
  const { orderItems, shippingAddress }: IOrder = req.body;

  const _id = req.user?._id;

  try {
    const order = await Order.create({
      _id: new mongoose.Types.ObjectId(),
      user: _id,
      orderItems,
      shippingAddress,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  createOrder,
};
