import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <h1>The Rent Hub - MERN (Next.js App Router)</h1>
      <p>Production-ready boilerplate with MongoDB, JWT auth, and property APIs.</p>
      <div className="grid">
        <Link href="/login" className="card">Admin Login</Link>
        <Link href="/admin" className="card">Admin Dashboard</Link>
        <Link href="/properties" className="card">Public Property Listings</Link>
      </div>
    </main>
  );
}
