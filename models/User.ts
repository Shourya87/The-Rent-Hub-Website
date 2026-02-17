import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
