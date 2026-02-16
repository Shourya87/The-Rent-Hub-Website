<div align="center">

# ⚫ THE RENT HUB  
### Modern Real Estate Platform

<p>
Minimal. Fast. Premium.
</p>

</div>

---

## 🏢 About The Project

The official website for **The Rent Hub Company** — a modern real estate listing platform focused on clean design, seamless browsing, and instant WhatsApp contact integration.

Built with a **minimal black & white aesthetic** to reflect trust, clarity, and premium service.

---

## 🚀 Features

- 🏠 Property Listings
- 🔍 Search & Filtering
- 📄 Detailed Property Pages
- 🧑‍💼 Admin Login + Property CRUD
- 🔗 Frontend + Express backend API integration
- 📱 Fully Responsive (Mobile-First)
- 💬 Direct WhatsApp Contact Button
- 🎨 Premium Black & White UI

---

## 🛠️ Tech Stack

- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🧩 shadcn/ui
- 🔁 React Router DOM
- 🟢 Node.js + Express backend

---

## 📂 Project Structure

```txt
backend/
  src/
    data/properties.json
    middleware/auth.js
    utils/propertyStore.js
    server.js
frontend/
  src/
    pages/
    components/
    context/
```

---

## ⚙️ Local Setup (Frontend + Backend Connected)

### 1) Backend setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on: `http://localhost:4000`

Optional backend env vars:

- `PORT` (default `4000`)
- `FRONTEND_ORIGIN` (default `http://localhost:5173`)
- `ADMIN_EMAIL` (default `admin@therenthub.com`)
- `ADMIN_PASSWORD` (default `admin123`)
- `ADMIN_TOKEN` (default `renthub-admin-token`)

### 2) Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

By default Vite proxy routes `/api/*` requests to `http://localhost:4000`.

If needed, set:

- `VITE_API_BASE_URL` (example `http://localhost:4000`)
- `VITE_PROXY_TARGET` (example `http://localhost:4000`)

---

## 🔐 Admin Panel Access

1. Open: `/core-team-entry`
2. Login using backend credentials (`ADMIN_EMAIL`, `ADMIN_PASSWORD`)
3. Access protected admin panel at: `/core-team/ops-console`

From admin panel, you can add/edit/delete properties and changes instantly reflect in listings.

---

## 🎯 Vision

To build a clean, high-performance, and AI-ready real estate platform that simplifies property discovery for tenants and owners.

Future upgrades:
- 🤖 AI Auto-Reply (Hindi & English)
- 🏘️ Owner Dashboard
- 🔐 Advanced role-based admin panel

---

## 🖤 Design Philosophy

Black & White.
No noise.
Only clarity.

Premium feel inspired by modern minimal platforms.

---

## 📞 Contact

The Rent Hub Company  
Helping you find the right place, effortlessly.

---

<div align="center">

⚫ Built with focus. Designed with clarity.

</div>
