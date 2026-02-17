import { connectDB } from "@/lib/db";
import { Property } from "@/models/Property";
import { ApiError } from "@/utils/api";
import { validatePropertyInput } from "@/utils/validators";

export async function createProperty(input: Record<string, unknown>) {
  await connectDB();
  const payload = validatePropertyInput(input);
  const property = await Property.create(payload);
  return property;
}

export async function listProperties() {
  await connectDB();
  return Property.find().sort({ createdAt: -1 });
}

export async function deleteProperty(id: string) {
  await connectDB();
  const deleted = await Property.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError("Property not found", 404);
  }

  return { id };
}
