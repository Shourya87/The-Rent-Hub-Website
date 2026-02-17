import { ApiError } from "@/utils/api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sanitize = (value: unknown) => String(value ?? "").trim();

export function validateAdminInput(email: unknown, password: unknown) {
  const safeEmail = sanitize(email).toLowerCase();
  const safePassword = sanitize(password);

  if (!emailRegex.test(safeEmail)) {
    throw new ApiError("Invalid email", 400);
  }

  if (safePassword.length < 6) {
    throw new ApiError("Password must be at least 6 characters", 400);
  }

  return { email: safeEmail, password: safePassword };
}

export function validatePropertyInput(payload: Record<string, unknown>) {
  const title = sanitize(payload.title);
  const description = sanitize(payload.description);
  const location = sanitize(payload.location);
  const owner = sanitize(payload.owner);
  const price = Number(payload.price);

  if (!title || !description || !location || !owner || Number.isNaN(price)) {
    throw new ApiError("All property fields are required", 400);
  }

  if (price < 0) {
    throw new ApiError("Price must be a positive number", 400);
  }

  return { title, description, location, owner, price };
}
