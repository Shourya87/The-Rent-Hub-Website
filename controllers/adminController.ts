import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/Admin";
import { ApiError } from "@/utils/api";
import { signToken } from "@/utils/jwt";
import { validateAdminInput } from "@/utils/validators";

export async function registerAdmin(input: { email: unknown; password: unknown }) {
  await connectDB();

  const { email, password } = validateAdminInput(input.email, input.password);

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new ApiError("Admin already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const admin = await Admin.create({ email, password: hashedPassword, role: "admin" });

  return {
    id: admin._id.toString(),
    email: admin.email,
    role: admin.role,
    createdAt: admin.createdAt,
  };
}

export async function loginAdmin(input: { email: unknown; password: unknown }) {
  await connectDB();

  const { email, password } = validateAdminInput(input.email, input.password);

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = signToken({
    adminId: admin._id.toString(),
    email: admin.email,
    role: admin.role,
  });

  return {
    token,
    admin: { id: admin._id.toString(), email: admin.email, role: admin.role },
  };
}

export async function meAdmin(adminId: string) {
  await connectDB();
  const admin = await Admin.findById(adminId).select("email role createdAt");
  if (!admin) {
    throw new ApiError("Admin not found", 404);
  }

  return admin;
}
