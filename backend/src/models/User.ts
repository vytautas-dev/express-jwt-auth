import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types";

const UserSchema: Schema = new Schema<IUser>({
  _id: { type: mongoose.Schema.Types.ObjectId },
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: { type: String, required: true },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  refreshToken: String,
});

export default mongoose.model<IUser>("User", UserSchema);
