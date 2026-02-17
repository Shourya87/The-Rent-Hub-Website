import { NextRequest } from "next/server";
import { createProperty, listProperties } from "@/controllers/propertyController";
import { requireAdmin } from "@/middleware/auth";
import { methodNotAllowed, ok, withErrorHandler } from "@/utils/api";

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    requireAdmin(request);
    const body = await request.json();
    const property = await createProperty(body);
    return ok(property, 201);
  });
}

export async function GET() {
  return withErrorHandler(async () => {
    const properties = await listProperties();
    return ok(properties, 200);
  });
}

export async function DELETE() {
  return methodNotAllowed();
}
