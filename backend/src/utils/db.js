import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../data");

const ensureFile = async (filePath, defaultValue) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, `${JSON.stringify(defaultValue, null, 2)}\n`, "utf8");
  }
};

export const createJsonCollection = (fileName, defaultValue = []) => {
  const filePath = path.resolve(dataDir, fileName);

  const read = async () => {
    await ensureFile(filePath, defaultValue);
    const raw = await fs.readFile(filePath, "utf8");

    try {
      const parsed = JSON.parse(raw);
      return parsed ?? defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const write = async (value) => {
    await ensureFile(filePath, defaultValue);
    await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  };

  return { read, write, filePath };
};
