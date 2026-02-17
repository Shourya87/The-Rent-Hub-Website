import { NextResponse } from "next/server";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export const ok = (data: unknown, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

export const fail = (message: string, status = 500) =>
  NextResponse.json({ success: false, message }, { status });

export const withErrorHandler = async (handler: () => Promise<NextResponse>) => {
  try {
    return await handler();
  } catch (error) {
    if (error instanceof ApiError) {
      return fail(error.message, error.status);
    }

    const message = error instanceof Error ? error.message : "Internal server error";
    return fail(message, 500);
  }
};

export const methodNotAllowed = () => fail("Method not allowed", 405);
