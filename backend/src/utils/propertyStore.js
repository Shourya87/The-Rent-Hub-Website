import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.resolve(__dirname, "../data/properties.json");

const readProperties = async () => {
  const raw = await fs.readFile(dataFilePath, "utf8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
};

const writeProperties = async (properties) => {
  await fs.writeFile(dataFilePath, `${JSON.stringify(properties, null, 2)}\n`, "utf8");
};

export const listProperties = async () => {
  const properties = await readProperties();
  return properties.sort((a, b) => Number(b.id) - Number(a.id));
};

export const getPropertyById = async (id) => {
  const properties = await readProperties();
  return properties.find((property) => Number(property.id) === Number(id)) || null;
};

export const createProperty = async (payload) => {
  const properties = await readProperties();
  const maxId = properties.reduce((max, property) => Math.max(max, Number(property.id) || 0), 0);
  const now = new Date().toISOString();

  const created = {
    ...payload,
    id: maxId + 1,
    createdAt: now,
    updatedAt: now,
  };

  properties.push(created);
  await writeProperties(properties);
  return created;
};

export const updatePropertyById = async (id, payload) => {
  const properties = await readProperties();
  const index = properties.findIndex((property) => Number(property.id) === Number(id));

  if (index < 0) {
    return null;
  }

  const updated = {
    ...properties[index],
    ...payload,
    id: properties[index].id,
    updatedAt: new Date().toISOString(),
  };

  properties[index] = updated;
  await writeProperties(properties);
  return updated;
};

export const deletePropertyById = async (id) => {
  const properties = await readProperties();
  const next = properties.filter((property) => Number(property.id) !== Number(id));

  if (next.length === properties.length) {
    return false;
  }

  await writeProperties(next);
  return true;
};
