"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Login failed");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="container">
      <div className="card" style={{ maxWidth: 500, margin: "0 auto" }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input className="input" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error ? <p style={{ color: "#ff7676" }}>{error}</p> : null}
          <button className="btn" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        </form>
      </div>
    </main>
  );
}
