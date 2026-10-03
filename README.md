# 7wenet west l bled

Phase 1 marketplace foundation for shops in Wist El Bled.

## Quick start

```bash
npm install --prefix server
npm install --prefix web
```

Copy `server/.env.example` to `server/.env` and `web/.env.example` to `web/.env.local`, then run `npm run dev` in each directory. The web app is available at `http://localhost:3000` and the API at `http://localhost:4000`.

Cloudinary uploads require `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in `server/.env`. Uploads accept JPEG, PNG, and WebP files up to 3 MB and are stored under the shop/product folders.

## Test accounts

| Role | Email | Password | State |
|---|---|---|---|
| Admin | admin@7wenet.tn | Admin@12345 | active |
| Partner | partner1@7wenet.tn | Partner@12345 | approved |
| Partner | partner2@7wenet.tn | Partner@12345 | approved |
| Partner | partner3@7wenet.tn | Partner@12345 | pending |
| Partner | partner4@7wenet.tn | Partner@12345 | rejected |
| Client | client1@7wenet.tn | Client@12345 | active |
| Client | client2@7wenet.tn | Client@12345 | active |

## Structure

- `web`: Next.js frontend and same-origin `/api` proxy.
- `server`: Express API, Mongoose models, services, seed script, and Vitest tests.
- `docs`: architecture and decisions.

Orders, cart, claims, pickup points, and KPI dashboards are intentionally reserved for Part 2.
