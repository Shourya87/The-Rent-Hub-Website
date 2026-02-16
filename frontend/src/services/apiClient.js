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

const request = async (path, options = {}) => {
  const response = await fetch(buildUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
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

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.includes(",") ? result.split(",")[1] : "";
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Unable to read selected file."));
    reader.readAsDataURL(file);
  });

export const apiClient = {
  getProperties: async () => {
    const payload = await request("/api/properties");
    return payload?.data || [];
  },
  createProperty: async (property) => {
    const payload = await request("/api/properties", {
      method: "POST",
      headers: { Authorization: `Bearer ${getStoredAdminToken()}` },
      body: JSON.stringify(property),
    });

    return payload?.data;
  },
  updateProperty: async (id, property) => {
    const payload = await request(`/api/properties/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${getStoredAdminToken()}` },
      body: JSON.stringify(property),
    });

    return payload?.data;
  },
  deleteProperty: async (id) => {
    await request(`/api/properties/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getStoredAdminToken()}` },
    });
  },
  adminLogin: async ({ email, password }) => {
    const payload = await request("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    return payload;
  },
  uploadMedia: async (file, mediaType = "image") => {
    const base64 = await fileToBase64(file);

    const payload = await request("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${getStoredAdminToken()}` },
      body: JSON.stringify({
        base64,
        mimeType: file.type,
        originalName: file.name,
        mediaType,
      }),
    });

    return payload?.data;
  },
};
