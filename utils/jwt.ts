import jwt from "jsonwebtoken";
import { env } from "@/config/env";

export interface JwtPayload {
  adminId: string;
  email: string;
  role: "admin";
}

export const signToken = (payload: JwtPayload) =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET) as JwtPayload;
