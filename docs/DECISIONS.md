# Decisions

## Same-origin authentication proxy

The browser only calls `/api/...` on the Next.js origin. Next.js rewrites those requests to the Render API server-side. This avoids cross-domain cookies, Safari tracking protection, third-party cookie blocking, CORS preflights, and unreliable `SameSite=None` behavior. The API still allows the configured frontend origin with credentials for local development.

## Phase-one scope

Cart, orders, claims, and pickup points are not implemented in this phase. The models include the fields and indexes needed by Part 2, including `pickupPoints: []` and the global settings document.

## Storage

Cloudinary is represented by an upload-signature endpoint and validated upload metadata. The API never writes user uploads to local disk.

Uploads are accepted only as JPEG, PNG, or WebP images up to 3 MB, are limited to five files per shop-document or product-image request, and are sent to Cloudinary under shop-scoped folders. The backend signs the upload parameters and performs the server-side upload, so Cloudinary credentials never reach the browser.

## Token refresh

The refresh token is rotated whenever `/api/auth/refresh` is called. The web app calls that endpoint silently before the 15-minute access token expires, preserving the same-origin httpOnly-cookie model without exposing tokens to JavaScript.
