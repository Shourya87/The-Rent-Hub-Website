import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createProperty,
  deletePropertyById,
  getPropertyById,
  listProperties,
  updatePropertyById,
  getStorageMode,
} from "./utils/propertyStore.js";
import { createAuthToken, requireAdminAuth } from "./middleware/auth.js";
import { saveBase64Media, uploadsRoot } from "./utils/mediaStore.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = Number(process.env.PORT) || 4000;
<<<<<<< HEAD
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@therenthub.com")
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173"
=======
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@therenthub.com").trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const allowedOrigins = FRONTEND_ORIGIN.split(",").map((item) => item.trim()).filter(Boolean);

const isAllowedOrigin = (origin = "") => {
  if (!origin) return true;
  return allowedOrigins.includes(origin);
};
>>>>>>> 6d74290cb88c965efc30e004b0ee0fa9ddacaffa

app.use((request, response, next) => {
  const origin = request.headers.origin || "";

  if (isAllowedOrigin(origin)) {
    response.header("Access-Control-Allow-Origin", origin || allowedOrigins[0] || "*");
  }

  response.header("Vary", "Origin");
  response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  next();
});

app.use(express.json({ limit: "50mb" }));
app.use("/uploads", express.static(uploadsRoot));
app.use("/", express.static(path.resolve(__dirname, "../public")));

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, storage: getStorageMode() });
});

app.post("/api/admin/login", (request, response) => {
  const email = request.body?.email?.trim()?.toLowerCase() || "";
  const password = request.body?.password || "";

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    response.status(401).json({ message: "Invalid admin email or password." });
    return;
  }

  response.json({
    token: createAuthToken(),
    admin: { email: ADMIN_EMAIL },
  });
});

app.post("/api/upload", requireAdminAuth, async (request, response) => {
  try {
    const { base64, mimeType, mediaType, originalName } = request.body || {};
    const saved = await saveBase64Media({ base64, mimeType, mediaType, originalName });

    response.status(201).json({
      data: {
        ...saved,
        url: `${request.protocol}://${request.get("host")}${saved.urlPath}`,
      },
    });
  } catch (error) {
    response.status(400).json({
      message: error instanceof Error ? error.message : "Unable to upload media.",
    });
  }
});

app.get("/api/properties", async (_request, response) => {
  const properties = await listProperties();
  response.json({ data: properties });
});

app.get("/api/properties/:id", async (request, response) => {
  const property = await getPropertyById(request.params.id);

  if (!property) {
    response.status(404).json({ message: "Property not found" });
    return;
  }

  response.json({ data: property });
});

app.post("/api/properties", requireAdminAuth, async (request, response) => {
  const payload = request.body || {};
  const created = await createProperty(payload);
  response.status(201).json({ data: created });
});

app.put("/api/properties/:id", requireAdminAuth, async (request, response) => {
  const payload = request.body || {};
  const updated = await updatePropertyById(request.params.id, payload);

  if (!updated) {
    response.status(404).json({ message: "Property not found" });
    return;
  }

  response.json({ data: updated });
});

app.delete("/api/properties/:id", requireAdminAuth, async (request, response) => {
  const deleted = await deletePropertyById(request.params.id);

  if (!deleted) {
    response.status(404).json({ message: "Property not found" });
    return;
  }

  response.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
