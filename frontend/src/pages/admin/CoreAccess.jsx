import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ADMIN_PANEL_PATH,
  ADMIN_SESSION_KEY,
  CORE_CODE_HASH,
} from "@/constants/adminAccess";

const toHex = (buffer) =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

async function generateHash(value) {
  const encoded = new TextEncoder().encode(value.trim());
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return toHex(digest);
}

const normalizeHash = (value) => value.trim().toLowerCase();

const isSha256Hash = (value) => /^[a-f0-9]{64}$/i.test(value.trim());

export default function CoreAccess() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isUnlocked = sessionStorage.getItem(ADMIN_SESSION_KEY) === "granted";

  if (isUnlocked) {
    return <Navigate to={ADMIN_PANEL_PATH} replace />;
  }

  const handleUnlock = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const normalizedInput = normalizeHash(code);
    const expectedHash = normalizeHash(CORE_CODE_HASH);

    const matchesByHashValue =
      isSha256Hash(normalizedInput) && normalizedInput === expectedHash;

    const candidateHash = await generateHash(code);
    const matchesBySecretCode = normalizeHash(candidateHash) === expectedHash;

    if (matchesByHashValue || matchesBySecretCode) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "granted");
      navigate(ADMIN_PANEL_PATH, { replace: true });
      return;
    }

    setError("Access denied");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-24">
      <div className="mx-auto max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl text-center font-bold font-sans text-slate-900">Admin Panel</h1>
        <p className="mt-2 text-md text-center text-slate-500">Enter team code given by Shourya(Admin).</p>

        <form onSubmit={handleUnlock} className="mt-6 space-y-4">
          <input
            type="password"
            autoComplete="off"
            required
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Team secret code"
            className="w-full rounded-lg border px-3 py-2"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-2 font-medium text-white"
            disabled={loading}
          >
            {loading ? "Checking..." : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}
