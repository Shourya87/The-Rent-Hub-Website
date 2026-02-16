const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const ADMIN_TOKEN_STORAGE_KEY = "renthub_admin_token";

const buildUrl = (path) => {
  if (!API_BASE_URL) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
};

export const getStoredAdminToken = () => localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || "";

export const setStoredAdminToken = (token) => {
  if (token) {
    localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
    return;
  }

  localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
};

const authHeader = () => {
  const token = getStoredAdminToken();

  if (!token) {
    throw new Error("Your admin session expired. Please login again.");
  }

  return { Authorization: `Bearer ${token}` };
};

const request = async (path, options = {}) => {
  const isFormDataBody = options.body instanceof FormData;
  const defaultHeaders = isFormDataBody ? {} : { "Content-Type": "application/json" };

  const response = await fetch(buildUrl(path), {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
};

export const apiClient = {
  getProperties: async () => {
    const payload = await request("/api/properties");
    return payload?.data || [];
  },
  createProperty: async (property) => {
    const payload = await request("/api/properties", {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(property),
    });

    return payload?.data;
  },
  updateProperty: async (id, property) => {
    const payload = await request(`/api/properties/${id}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(property),
    });

    return payload?.data;
  },
  deleteProperty: async (id) => {
    await request(`/api/properties/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
  },
  adminLogin: async ({ email, password }) => {
    const payload = await request("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!payload?.token) {
      throw new Error("Login succeeded but token was not returned by server.");
    }

    return payload;
  },
  uploadMedia: async (file, mediaType = "image") => {
    const formData = new FormData();
    formData.append("base64", file);
    formData.append("mimeType", file.type || "");
    formData.append("originalName", file.name || "media");
    formData.append("mediaType", mediaType);

    const payload = await request("/api/upload", {
      method: "POST",
      headers: authHeader(),
      body: formData,
    });

    return payload?.data;
  },
};
