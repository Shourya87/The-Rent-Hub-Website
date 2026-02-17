import { NextRequest } from "next/server";
import { ApiError } from "@/utils/api";
import { env } from "@/config/env";
import { verifyToken, type JwtPayload } from "@/utils/jwt";

export const getTokenFromRequest = (request: NextRequest) => {
  const authHeader = request.headers.get("authorization") || "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }

  const cookieToken = request.cookies.get(env.COOKIE_NAME)?.value;
  return cookieToken || "";
};

export const requireAdmin = (request: NextRequest): JwtPayload => {
  const token = getTokenFromRequest(request);

  if (!token) {
    throw new ApiError("Unauthorized", 401);
  }

  let payload: JwtPayload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new ApiError("Invalid or expired token", 401);
  }

  if (payload.role !== "admin") {
    throw new ApiError("Forbidden", 403);
  }

  return payload;
};
