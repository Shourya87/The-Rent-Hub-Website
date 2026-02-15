import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/services/supabaseClient";
import { ADMIN_PANEL_PATH } from "@/constants/adminAccess";

export default function CoreAccess() {
  const [form, setForm] = useState({ email: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkedSession, setCheckedSession] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.setSessionFromUrl();
      const activeSession = data?.session || (await supabase.auth.getSession()).data?.session;
      setIsAuthenticated(Boolean(activeSession));
      setCheckedSession(true);
    };

    checkSession();
  }, []);

  if (!checkedSession) {
    return (
      <div className="min-h-screen bg-black px-4 py-24">
        <div className="mx-auto max-w-md rounded-2xl border bg-black p-8 shadow-sm">
          <p className="text-center text-slate-300">Checking access...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={ADMIN_PANEL_PATH} replace />;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error: loginError } = await supabase.auth.signInWithOtp({
      email: form.email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}${window.location.pathname}`,
      },
    });

    if (loginError) {
      setError(loginError.message || "Access denied");
      setLoading(false);
      return;
    }

    setMessage("Login link sent. Please check your email and open the link to continue.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black px-4 py-24">
      <div className="mx-auto max-w-md rounded-2xl border bg-black p-8 shadow-sm">
        <h1 className="text-2xl text-center font-bold font-sans text-white">Admin Panel</h1>
        <p className="mt-2 text-md text-center text-slate-500">
          Enter your admin email. We will send you a secure login link.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            className="w-full rounded-lg border border-white/20 bg-white px-3 py-2"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-500">{message}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-linear-to-r from-orange-500 to-pink-500 px-4 py-2 font-medium text-white"
            disabled={loading}
          >
            {loading ? "Sending link..." : "Send login link"}
          </button>
        </form>
      </div>
    </div>
  );
}
