import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsRoot = path.resolve(__dirname, "../uploads");
const imagesDir = path.resolve(uploadsRoot, "images");
const videosDir = path.resolve(uploadsRoot, "videos");

const SUPABASE_URL = (process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "");
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
export const SUPABASE_STORAGE_BUCKET = (process.env.SUPABASE_STORAGE_BUCKET || "property-media").trim();

const sanitize = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "file";

const getFolderByMimeType = (mimeType = "") => (mimeType.startsWith("video/") ? "videos" : "images");

const extensionByMime = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

const isSupabaseConfigured = () => Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

const ensureSupabaseConfigured = () => {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
};

const ensureLocalUploadDirs = async () => {
  await fs.mkdir(imagesDir, { recursive: true });
  await fs.mkdir(videosDir, { recursive: true });
};

export const getStorageMode = () => (isSupabaseConfigured() ? "supabase-storage" : "local");

export const getSupabasePublicUrl = (fileKey = "") => {
  if (!fileKey || !SUPABASE_URL || !SUPABASE_STORAGE_BUCKET) {
    return "";
  }

  const encodedPath = fileKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/${encodedPath}`;
};

const uploadToSupabase = async ({ file, fileKey, mimeType }) => {
  ensureSupabaseConfigured();

  const encodedKey = fileKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${SUPABASE_STORAGE_BUCKET}/${encodedKey}`;

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": mimeType,
      "x-upsert": "false",
    },
    body: file.buffer,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || `Supabase upload failed with status ${response.status}.`);
  }

  return getSupabasePublicUrl(fileKey);
};

const uploadToLocal = async ({ file, fileKey }) => {
  await ensureLocalUploadDirs();
  const targetPath = path.resolve(uploadsRoot, fileKey);

  if (!targetPath.startsWith(uploadsRoot)) {
    throw new Error("Invalid file path.");
  }

  await fs.writeFile(targetPath, file.buffer);
  return {
    publicPath: `/uploads/${fileKey}`,
    storedKey: `/uploads/${fileKey}`,
  };
};

export const uploadMediaFile = async ({ file, mediaType = "image" }) => {
  if (!file?.buffer) {
    throw new Error("No file buffer was received.");
  }

  const mimeType = file.mimetype || "application/octet-stream";
  const isImage = mimeType.startsWith("image/");
  const isVideo = mimeType.startsWith("video/");

  if ((mediaType === "image" && !isImage) || (mediaType === "video" && !isVideo)) {
    throw new Error("Media type and uploaded file type do not match.");
  }

  const folder = getFolderByMimeType(mimeType);
  const extension = extensionByMime[mimeType] || "bin";
  const safeBaseName = sanitize((file.originalname || "media").replace(/\.[^.]+$/, ""));
  const fileKey = `${folder}/${Date.now()}-${safeBaseName}.${extension}`;

  const isSupabase = isSupabaseConfigured();
  const localUpload = isSupabase
    ? null
    : await uploadToLocal({ file, fileKey });

  const url = isSupabase
    ? await uploadToSupabase({ file, fileKey, mimeType })
    : localUpload.publicPath;

  return {
    fileKey: isSupabase ? fileKey : localUpload.storedKey,
    mimeType,
    size: file.size || file.buffer.length,
    url,
  };
};
