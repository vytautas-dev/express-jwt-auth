import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/types";

const ProductSchema: Schema = new Schema<IProduct>({
  _id: { type: mongoose.Schema.Types.ObjectId },
  title: {
    type: String,
    required: true,
    unique: true,
  },

  desc: {
    type: String,
    required: true,
  },
  img: { type: String, required: true },
  categories: { type: [String], required: true },
  price: { type: Number, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
