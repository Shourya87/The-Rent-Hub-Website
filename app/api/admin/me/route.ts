import { NextRequest } from "next/server";
import { meAdmin } from "@/controllers/adminController";
import { requireAdmin } from "@/middleware/auth";
import { methodNotAllowed, ok, withErrorHandler } from "@/utils/api";

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const payload = requireAdmin(request);
    const admin = await meAdmin(payload.adminId);
    return ok(admin, 200);
  });
}

export async function POST() {
  return methodNotAllowed();
}
