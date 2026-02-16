const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const SUPABASE_TABLE = process.env.SUPABASE_PROPERTIES_TABLE || "properties";

const isConfigured = () => Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

const headers = {
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const request = async (path, options = {}) => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.text();
  const parsed = payload ? JSON.parse(payload) : null;

  if (!response.ok) {
    const message = parsed?.message || parsed?.error || `Supabase request failed: ${response.status}`;
    throw new Error(message);
  }

  return parsed;
};

const list = async () => {
  const data = await request(`${SUPABASE_TABLE}?select=*&order=id.desc`);
  return Array.isArray(data) ? data : [];
};

const getById = async (id) => {
  const data = await request(`${SUPABASE_TABLE}?select=*&id=eq.${id}&limit=1`);
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
};

const create = async (payload) => {
  const data = await request(SUPABASE_TABLE, {
    method: "POST",
    body: JSON.stringify([payload]),
  });

  return Array.isArray(data) ? data[0] : null;
};

const updateById = async (id, payload) => {
  const data = await request(`${SUPABASE_TABLE}?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return Array.isArray(data) && data.length > 0 ? data[0] : null;
};

const deleteById = async (id) => {
  const data = await request(`${SUPABASE_TABLE}?id=eq.${id}`, {
    method: "DELETE",
  });

  return Array.isArray(data) && data.length > 0;
};

export const postgresStore = {
  isConfigured,
  list,
  getById,
  create,
  updateById,
  deleteById,
};
