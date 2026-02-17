import { NextRequest, NextResponse } from "next/server";
import { loginAdmin } from "@/controllers/adminController";
import { env } from "@/config/env";
import { methodNotAllowed, ok, withErrorHandler } from "@/utils/api";

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const body = await request.json();
    const result = await loginAdmin(body);

    const response = ok({ admin: result.admin }, 200);
    response.cookies.set(env.COOKIE_NAME, result.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  });
}

export async function GET() {
  return methodNotAllowed();
}
