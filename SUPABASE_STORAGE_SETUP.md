# Supabase Storage Setup (The Rent Hub)

## 1) Bucket
Create a public bucket named `property-media`.

## 2) Folder convention
- `images/*` for images
- `videos/*` for videos

Backend uploads with these key patterns:
- `images/<timestamp>-<safe-name>.<ext>`
- `videos/<timestamp>-<safe-name>.<ext>`

## 3) RLS and policies
If bucket is **public**, read works without auth. Keep **insert/update/delete restricted** to backend service role key only.

Recommended policies:
- Public read policy on `storage.objects` for bucket `property-media`
- No public insert/update/delete policies

## 4) CORS
Use backend CORS allowlist via `FRONTEND_ORIGIN`:
- local: `http://localhost:5173`
- prod: `https://<your-frontend-domain>`

Multiple origins can be comma-separated.

## 5) Data model recommendation
Store only file keys in DB:
- `image: "images/1700000000000-home.jpg"`
- `video: "videos/1700000000000-walkthrough.mp4"`

Frontend resolves keys to public URLs with Supabase client helper.
