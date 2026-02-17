import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
  role: "admin";
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
