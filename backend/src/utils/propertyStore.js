import { createJsonCollection } from "./db.js";

const propertiesDb = createJsonCollection("properties.json", []);

export const listProperties = async () => {
  const properties = await propertiesDb.read();
  return Array.isArray(properties)
    ? properties.sort((a, b) => Number(b.id) - Number(a.id))
    : [];
};

export const getPropertyById = async (id) => {
  const properties = await propertiesDb.read();
  if (!Array.isArray(properties)) {
    return null;
  }

  return properties.find((property) => Number(property.id) === Number(id)) || null;
};

export const createProperty = async (payload) => {
  const properties = await propertiesDb.read();
  const safeProperties = Array.isArray(properties) ? properties : [];
  const maxId = safeProperties.reduce((max, property) => Math.max(max, Number(property.id) || 0), 0);
  const now = new Date().toISOString();

  const created = {
    ...payload,
    id: maxId + 1,
    createdAt: now,
    updatedAt: now,
  };

  safeProperties.push(created);
  await propertiesDb.write(safeProperties);
  return created;
};

export const updatePropertyById = async (id, payload) => {
  const properties = await propertiesDb.read();
  const safeProperties = Array.isArray(properties) ? properties : [];
  const index = safeProperties.findIndex((property) => Number(property.id) === Number(id));

  if (index < 0) {
    return null;
  }

  const updated = {
    ...safeProperties[index],
    ...payload,
    id: safeProperties[index].id,
    updatedAt: new Date().toISOString(),
  };

  safeProperties[index] = updated;
  await propertiesDb.write(safeProperties);
  return updated;
};

export const deletePropertyById = async (id) => {
  const properties = await propertiesDb.read();
  const safeProperties = Array.isArray(properties) ? properties : [];
  const next = safeProperties.filter((property) => Number(property.id) !== Number(id));

  if (next.length === safeProperties.length) {
    return false;
  }

  await propertiesDb.write(next);
  return true;
};

export const getStorageMode = () => (usePostgres() ? "postgres" : "json");
