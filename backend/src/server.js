import express from "express";
import {
  createProperty,
  deletePropertyById,
  getPropertyById,
  listProperties,
  updatePropertyById,
} from "./utils/propertyStore.js";
import { createAuthToken, requireAdminAuth } from "./middleware/auth.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import upload from "./middleware/multer.js";
import {
  getStorageMode,
  SUPABASE_STORAGE_BUCKET,
  uploadMediaFile,
} from "./utils/mediaStore.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const PORT = Number(process.env.PORT) || 4000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@therenthub.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

const allowedOrigins = FRONTEND_ORIGIN.split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin) => allowedOrigins.includes(origin);

app.use((request, response, next) => {
  const origin = request.headers.origin || "";

  if (!origin || isAllowedOrigin(origin)) {
    response.header("Access-Control-Allow-Origin", origin || "*");
  }

  response.header("Vary", "Origin");
  response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  next();
});

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    storage: getStorageMode(),
    bucket: SUPABASE_STORAGE_BUCKET,
  });
});

app.post("/api/admin/login", (request, response) => {
  const email = request.body?.email?.trim()?.toLowerCase() || "";
  const password = request.body?.password || "";

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return response.status(401).json({
      message: "Invalid admin email or password.",
    });
  }

  response.json({
    success: true,
    token: createAuthToken(),
    admin: { email: ADMIN_EMAIL },
  });
});

app.post("/api/upload", requireAdminAuth, upload.single("file"), async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const mediaType = request.body?.mediaType === "video" ? "video" : "image";
    const uploaded = await uploadMediaFile({
      file: request.file,
      mediaType,
    });

    response.status(201).json({
      success: true,
      data: {
        fileKey: uploaded.fileKey,
        fileName: uploaded.fileKey.split("/").pop(),
        mimeType: uploaded.mimeType,
        size: uploaded.size,
        url: uploaded.url,
      },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
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
    return response.status(404).json({ message: "Property not found" });
  }

  response.json({ data: property });
});

app.post("/api/properties", requireAdminAuth, async (request, response) => {
  const created = await createProperty(request.body || {});
  response.status(201).json({ data: created });
});

app.put("/api/properties/:id", requireAdminAuth, async (request, response) => {
  const updated = await updatePropertyById(request.params.id, request.body || {});

  if (!updated) {
    return response.status(404).json({ message: "Property not found" });
  }

  response.json({ data: updated });
});

app.delete("/api/properties/:id", requireAdminAuth, async (request, response) => {
  const deleted = await deletePropertyById(request.params.id);

  if (!deleted) {
    return response.status(404).json({ message: "Property not found" });
  }

  response.status(204).end();
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
