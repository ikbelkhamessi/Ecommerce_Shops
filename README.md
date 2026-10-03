# 7wenet west l bled

Phase 1 marketplace foundation for shops in Wist El Bled.

## Quick start

```bash
npm install --prefix server
npm install --prefix web
```

Copy `server/.env.example` to `server/.env` and `web/.env.example` to `web/.env.local`, then run `npm run dev` in each directory. The web app is available at `http://localhost:3000` and the API at `http://localhost:4000`.

Cloudinary uploads require `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in `server/.env`. Uploads accept JPEG, PNG, and WebP files up to 3 MB and are stored under the shop/product folders.

## Free MongoDB Atlas setup

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/atlas), create a free **M0** cluster, and choose a nearby region.
2. In **Database Access**, create a database user and save its password.
3. In **Network Access**, add your development IP address. For a temporary local test only, `0.0.0.0/0` is possible but is less secure.
4. Select **Connect > Drivers**, copy the Node.js connection string, replace `<password>`, and set it as `MONGODB_URI` in `server/.env`, for example `mongodb+srv://user:password@cluster.mongodb.net/7wenet?retryWrites=true&w=majority`.
5. Run `npm run seed --prefix server` once, then start the API and web app.

Never commit `server/.env`; it is excluded by `.gitignore`.

### Adding accounts without deleting existing data

- Clients and partners can use `/register`; choose the account type in the form. A partner must then complete `/partner/application` and wait for admin approval.
- To create or promote an admin without deleting any users, run:

```powershell
npm run create-admin --prefix server -- admin@example.com "Use-a-strong-password" "Admin Name"
```

This command is idempotent. It promotes an existing account with that email to `admin` and updates its password. Do not use `npm run seed --prefix server` for this purpose: `seed` clears users, shops, and products before inserting demo data.

## Gmail/Google sign-in setup

1. Open [Google Cloud Console](https://console.cloud.google.com/), create/select a project, configure the OAuth consent screen, and add yourself as a test user while the app is in testing.
2. Create an **OAuth client ID** with application type **Web application**.
3. Add `http://localhost:3000` to **Authorized JavaScript origins**. Add the production frontend origin later.
4. Put the client ID in both `server/.env` as `GOOGLE_CLIENT_ID` and `web/.env.local` as `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
5. Restart both development servers. The login and registration pages will show the Google button. The backend verifies the Google ID token, creates or links the user by verified email, and sets the normal httpOnly access/refresh cookies.

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
