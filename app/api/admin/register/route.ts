import { NextRequest } from "next/server";
import { registerAdmin } from "@/controllers/adminController";
import { methodNotAllowed, ok, withErrorHandler } from "@/utils/api";

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const body = await request.json();
    const admin = await registerAdmin(body);
    return ok(admin, 201);
  });
}

export async function GET() {
  return methodNotAllowed();
}
