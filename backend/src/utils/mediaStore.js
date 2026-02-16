import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.resolve(__dirname, "../uploads");

const sanitize = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "file";

const extensionByMime = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

export const saveBase64Media = async ({ base64, mimeType, mediaType = "image", originalName = "media" }) => {

  console.log(base64);


  if (!base64 || !mimeType) {
    throw new Error("Missing media payload.");
  }

  const isImage = mimeType.startsWith("image/");
  const isVideo = mimeType.startsWith("video/");

  if ((mediaType === "image" && !isImage) || (mediaType === "video" && !isVideo)) {
    throw new Error("Media type and mime type mismatch.");
  }

  const buffer = Buffer.from(base64, "base64");
  const extension = extensionByMime[mimeType] || "bin";
  const folder = mediaType === "video" ? "videos" : "images";
  const timestamp = Date.now();
  const fileName = `${timestamp}-${sanitize(originalName.replace(/\.[^.]+$/, ""))}.${extension}`;
  const destinationDir = path.resolve(uploadsDir, folder);
  const destinationPath = path.resolve(destinationDir, fileName);

  await fs.mkdir(destinationDir, { recursive: true });
  await fs.writeFile(destinationPath, buffer);

  return {
    fileName,
    mimeType,
    size: buffer.length,
    urlPath: `/uploads/${folder}/${fileName}`,
  };
};

export const uploadsRoot = uploadsDir;