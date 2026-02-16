const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const STORAGE_KEY = "renthub_supabase_session";
const RUNTIME_CONFIG_KEY = "renthub_supabase_runtime_config";
const listeners = new Set();

const normalizeSupabaseUrl = (value) => {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return "";
  }

  const cleanedValue = trimmedValue.replace(/\/+$/, "");

  if (/^https?:\/\//i.test(cleanedValue)) {
    return cleanedValue;
  }

  if (cleanedValue.includes(".")) {
    return `https://${cleanedValue}`;
  }

  return `https://${cleanedValue}.supabase.co`;
};

const readRuntimeConfig = () => {
  try {
    const raw = localStorage.getItem(RUNTIME_CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getSupabaseUrl = () => normalizeSupabaseUrl(rawSupabaseUrl || readRuntimeConfig()?.url || "");
const getSupabaseAnonKey = () => (rawSupabaseAnonKey || readRuntimeConfig()?.anonKey || "").trim();

const persistRuntimeConfig = ({ url = "", anonKey = "" }) => {
  const nextConfig = {
    url: String(url || "").trim(),
    anonKey: String(anonKey || "").trim(),
  };

  localStorage.setItem(RUNTIME_CONFIG_KEY, JSON.stringify(nextConfig));
};

const defaultStorageBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET?.trim() || "property-media";

const sanitizeFileName = (name = "") =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "file";

const encodeStoragePath = (path) =>
  path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

const uploadFileToStorage = async ({ bucket = defaultStorageBucket, path, file, upsert = true }) => {
  const configError = getSupabaseConfigError();
  if (configError) {
    return { data: null, error: { message: configError } };
  }

  const currentSession = readSession();
  const encodedPath = encodeStoragePath(path);
  const uploadUrl = `${getSupabaseUrl()}/storage/v1/object/${bucket}/${encodedPath}`;

  const baseHeaders = {
    apikey: getSupabaseAnonKey(),
    "Content-Type": file.type || "application/octet-stream",
  };

  const authHeaders = currentSession?.access_token
    ? { Authorization: `Bearer ${currentSession.access_token}` }
    : {};

  let response;

  try {
    response = await fetch(`${uploadUrl}?upsert=${upsert ? "true" : "false"}`, {
      method: "POST",
      headers: {
        ...baseHeaders,
        ...authHeaders,
      },
      body: file,
    });
  } catch (error) {
    return {
      data: null,
      error: {
        message:
          error instanceof Error
            ? `Unable to upload media to Supabase Storage: ${error.message}`
            : "Unable to upload media to Supabase Storage.",
      },
    };
  }

  const payload = await parseResponseBody(response);

  if (!response.ok) {
    return {
      data: null,
      error: {
        message:
          payload?.error ||
          payload?.message ||
          payload?.msg ||
          `Upload failed (${response.status})`,
      },
    };
  }

  const publicUrl = `${getSupabaseUrl()}/storage/v1/object/public/${bucket}/${encodedPath}`;

  return {
    data: {
      ...payload,
      path,
      bucket,
      publicUrl,
    },
    error: null,
  };
};

const getSupabaseConfigError = () => {
  if (!getSupabaseUrl()) {
    return "Missing VITE_SUPABASE_URL environment variable.";
  }

  try {
    new URL(getSupabaseUrl());
  } catch {
    return "Invalid VITE_SUPABASE_URL. Use the full Supabase project URL or project ref.";
  }

  if (!getSupabaseAnonKey()) {
    return "Missing VITE_SUPABASE_ANON_KEY environment variable.";
  }

  return null;
};

const parseResponseBody = async (response) => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const readSession = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeSession = (session) => {
  if (session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
};

const notifyAuthChange = (event, session) => {
  listeners.forEach((listener) => listener(event, session));
};

const buildHeaders = (withAuth = false) => {
  const headers = {
    apikey: getSupabaseAnonKey(),
    "Content-Type": "application/json",
  };

  if (withAuth) {
    const currentSession = readSession();
    if (currentSession?.access_token) {
      headers.Authorization = `Bearer ${currentSession.access_token}`;
    }
  }

  return headers;
};

const getSession = async () => ({ data: { session: readSession() }, error: null });

const setSessionFromUrl = () => {
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;

  if (!hash) {
    return { data: { session: readSession() }, error: null };
  }

  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  const tokenType = params.get("token_type");
  const expiresIn = Number(params.get("expires_in") || 3600);

  if (!accessToken) {
    return { data: { session: readSession() }, error: null };
  }

  const expiresAt = Math.floor(Date.now() / 1000) + (Number.isFinite(expiresIn) ? expiresIn : 3600);
  const session = {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: tokenType || "bearer",
    expires_in: expiresIn,
    expires_at: expiresAt,
    user: readSession()?.user || null,
  };

  writeSession(session);
  notifyAuthChange("SIGNED_IN", session);

  const cleanedUrl = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState({}, document.title, cleanedUrl);

  return { data: { session }, error: null };
};

const signInWithPassword = async ({ email, password }) => {
  const configError = getSupabaseConfigError();
  if (configError) {
    return { data: null, error: { message: configError } };
  }

  let response;

  try {
    response = await fetch(`${getSupabaseUrl()}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return {
      data: null,
      error: {
        message: "Unable to reach Supabase auth server. Check VITE_SUPABASE_URL.",
      },
    };
  }

  const payload = await parseResponseBody(response);

  if (!response.ok) {
    return {
      data: null,
      error: {
        message: payload?.msg || payload?.error_description || "Login failed",
      },
    };
  }

  if (!payload) {
    return { data: null, error: { message: "Login failed: empty server response." } };
  }

  writeSession(payload);
  notifyAuthChange("SIGNED_IN", payload);

  return { data: { session: payload, user: payload.user }, error: null };
};

const signInWithOtp = async ({ email, options = {} }) => {
  const configError = getSupabaseConfigError();
  if (configError) {
    return { data: null, error: { message: configError } };
  }

  let response;

  try {
    response = await fetch(`${getSupabaseUrl()}/auth/v1/otp`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({
        email,
        create_user: false,
        email_redirect_to: options.emailRedirectTo,
      }),
    });
  } catch {
    return {
      data: null,
      error: {
        message: "Unable to reach Supabase auth server. Check VITE_SUPABASE_URL.",
      },
    };
  }

  const payload = await parseResponseBody(response);

  if (!response.ok) {
    return {
      data: null,
      error: {
        message:
          payload?.msg ||
          payload?.error_description ||
          payload?.message ||
          "Unable to send login link",
      },
    };
  }

  return { data: payload || {}, error: null };
};

const signOut = async () => {
  const currentSession = readSession();

  try {
    await fetch(`${getSupabaseUrl()}/auth/v1/logout`, {
      method: "POST",
      headers: {
        ...buildHeaders(),
        ...(currentSession?.access_token
          ? { Authorization: `Bearer ${currentSession.access_token}` }
          : {}),
      },
    });
  } catch {
    // ignore logout endpoint failures and clear local session anyway
  }

  writeSession(null);
  notifyAuthChange("SIGNED_OUT", null);

  return { error: null };
};

const onAuthStateChange = (callback) => {
  listeners.add(callback);

  return {
    data: {
      subscription: {
        unsubscribe: () => listeners.delete(callback),
      },
    },
  };
};

export const supabase = {
  auth: {
    getSession,
    setSessionFromUrl,
    signInWithPassword,
    signInWithOtp,
    signOut,
    onAuthStateChange,
  },
  storage: {
    getConfigError() {
      return getSupabaseConfigError();
    },
    setRuntimeConfig(config) {
      persistRuntimeConfig(config);
    },
    async uploadPropertyMedia(file, mediaType = "image") {
      const extension = file.name.includes(".")
        ? file.name.split(".").pop()?.toLowerCase()
        : "bin";
      const safeName = sanitizeFileName(file.name.replace(/\.[^.]+$/, ""));
      const timestamp = Date.now();
      const path = `${mediaType}/${timestamp}-${safeName}.${extension || "bin"}`;

      return uploadFileToStorage({ file, path });
    },
  },
  rest: {
    async get(path) {
      const configError = getSupabaseConfigError();
      if (configError) {
        return { data: null, error: { message: configError } };
      }

      let response;

      try {
        response = await fetch(`${getSupabaseUrl()}/rest/v1/${path}`, {
          headers: buildHeaders(true),
        });
      } catch {
        return {
          data: null,
          error: { message: "Unable to reach Supabase API. Check VITE_SUPABASE_URL." },
        };
      }

      const data = await parseResponseBody(response);

      if (!response.ok) {
        return { data: null, error: data || { message: "Request failed" } };
      }

      return { data, error: null };
    },
  },
};
