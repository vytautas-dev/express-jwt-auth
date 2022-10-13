import { Document, PopulatedDoc, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  refreshToken: string;
}

export interface IProduct extends Document {
  _id: Types.ObjectId;
  title: string;
  desc: string;
  img: string;
  categories: string[];
  price: number;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  user: PopulatedDoc<IUser>;
  orderItems: [product: PopulatedDoc<IProduct>, quantity: number];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}
