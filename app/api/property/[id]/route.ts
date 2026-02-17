import { NextRequest } from "next/server";
import { deleteProperty } from "@/controllers/propertyController";
import { requireAdmin } from "@/middleware/auth";
import { methodNotAllowed, ok, withErrorHandler } from "@/utils/api";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return withErrorHandler(async () => {
    requireAdmin(request);
    const result = await deleteProperty(params.id);
    return ok(result, 200);
  });
}

export async function GET() {
  return methodNotAllowed();
}
