import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product";
import { IProduct } from "../types/types";

// @route    GET api/products
// @desc     Get all products
// @access   Public

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @route    GET api/products/:id
// @desc     Get product
// @access   Public

const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @route    POST api/products
// @desc     Create product
// @access   Admin

const createProduct = async (req: Request, res: Response) => {
  const { title, desc, img, categories, price }: IProduct = req.body;

  if (!title || !desc || !img || !categories || !price)
    return res.status(400).json({ message: "Please add all fields" });

  try {
    const product = await Product.create({
      _id: new mongoose.Types.ObjectId(),
      title,
      desc,
      img,
      categories,
      price,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @route    PUT api/products/:id
// @desc     Update product
// @access   Admin

const updateProduct = async (req: Request, res: Response) => {
  const { title, desc, img, categories, price }: IProduct = req.body;
  const { id } = req.params;

  if (!title || !desc || !img || !categories || !price)
    res.status(400).json({ message: "Please add all fields" });

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @route    DELETE api/products/:id
// @desc     delete product
// @access   Admin

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json(`This product was deleted - ${deletedProduct}`);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
