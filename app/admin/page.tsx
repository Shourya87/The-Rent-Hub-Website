"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  owner: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [form, setForm] = useState({ title: "", description: "", price: "", location: "", owner: "" });

  const loadData = async () => {
    const meRes = await fetch("/api/admin/me");
    if (!meRes.ok) {
      router.push("/login");
      return;
    }

    setAuthorized(true);
    const listRes = await fetch("/api/property");
    const listData = await listRes.json();
    setProperties(listData.data || []);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createProperty = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/property", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });

    if (!response.ok) return;

    setForm({ title: "", description: "", price: "", location: "", owner: "" });
    loadData();
  };

  const onDelete = async (id: string) => {
    await fetch(`/api/property/${id}`, { method: "DELETE" });
    loadData();
  };

  if (!authorized) {
    return <main className="container"><p>Checking authentication...</p></main>;
  }

  return (
    <main className="container">
      <h1>Admin Dashboard</h1>
      <div className="card">
        <h3>Create Property</h3>
        <form onSubmit={createProperty}>
          <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          <input className="input" placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required />
          <input className="input" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required />
          <input className="input" placeholder="Location" value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} required />
          <input className="input" placeholder="Owner" value={form.owner} onChange={(e) => setForm((p) => ({ ...p, owner: e.target.value }))} required />
          <button className="btn" type="submit">Create</button>
        </form>
      </div>

      <div style={{ height: 16 }} />

      <div className="grid">
        {properties.map((property) => (
          <div className="card" key={property._id}>
            <h4>{property.title}</h4>
            <p>{property.description}</p>
            <p>₹{property.price} • {property.location} • {property.owner}</p>
            <button className="btn" onClick={() => onDelete(property._id)}>Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
}
