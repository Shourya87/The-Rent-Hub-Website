const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const STORAGE_KEY = "renthub_supabase_session";
const listeners = new Set();

const getSupabaseConfigError = () => {
  if (!supabaseUrl) {
    return "Missing VITE_SUPABASE_URL environment variable.";
  }

  if (!supabaseAnonKey) {
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
    apikey: supabaseAnonKey,
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

const signInWithPassword = async ({ email, password }) => {
  const configError = getSupabaseConfigError();
  if (configError) {
    return { data: null, error: { message: configError } };
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ email, password }),
  });

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

const signOut = async () => {
  const currentSession = readSession();

  try {
    await fetch(`${supabaseUrl}/auth/v1/logout`, {
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
    signInWithPassword,
    signOut,
    onAuthStateChange,
  },
  rest: {
    async get(path) {
      const configError = getSupabaseConfigError();
      if (configError) {
        return { data: null, error: { message: configError } };
      }

      const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
        headers: buildHeaders(true),
      });

      const data = await parseResponseBody(response);

      if (!response.ok) {
        return { data: null, error: data || { message: "Request failed" } };
      }

      return { data, error: null };
    },
  },
};
