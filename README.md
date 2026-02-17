# The Rent Hub - Production-ready MERN (Next.js App Router + TypeScript)

This repository now includes a full-stack MERN implementation using:
- **Frontend**: Next.js App Router + TypeScript
- **Backend**: Next.js Route Handlers (`/app/api`)
- **DB**: MongoDB + Mongoose
- **Auth**: JWT admin auth (HTTP-only cookie)
- **Password Hashing**: bcrypt

## Folder Structure

```txt
app/
  api/
    admin/register/route.ts
    admin/login/route.ts
    admin/me/route.ts
    property/route.ts
    property/[id]/route.ts
  login/page.tsx
  admin/page.tsx
  properties/page.tsx
  layout.tsx
  page.tsx
  globals.css
controllers/
  adminController.ts
  propertyController.ts
lib/
  db.ts
models/
  Admin.ts
  User.ts
  Property.ts
middleware/
  auth.ts
utils/
  api.ts
  jwt.ts
  validators.ts
config/
  env.ts
```

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Set values:
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `COOKIE_NAME`
- `NEXT_PUBLIC_BASE_URL` (optional for SSR property page, e.g. `http://localhost:3000`)

## API Endpoints

- `POST /api/admin/register`
- `POST /api/admin/login`
- `GET /api/admin/me` (protected)
- `POST /api/property` (protected)
- `GET /api/property`
- `DELETE /api/property/:id` (protected)

### Error response format

```json
{
  "success": false,
  "message": "Error message"
}
```

## Run Locally

```bash
npm install
npm run dev
```

Open:
- `http://localhost:3000/`
- `http://localhost:3000/login`
- `http://localhost:3000/admin`
- `http://localhost:3000/properties`

## Sample MongoDB schema creation

Mongoose auto-creates collections from models:
- `admins`
- `users`
- `properties`

You can register first admin using:

```bash
curl -X POST http://localhost:3000/api/admin/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@therenthub.com","password":"admin123"}'
```
