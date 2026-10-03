# Architecture

`web` is a strict TypeScript Next.js App Router application. Its `/api/:path*` rewrite provides the same-origin browser boundary. `server` is a strict TypeScript Express application with Zod validation and Mongoose persistence.

Business rules live in `server/src/services`, while route handlers translate HTTP input/output. Roles are data (`users.roles`) and permissions are one static map in `server/src/config/permissions.ts`; adding a role means adding one map entry, not refactoring authorization.

The shop model embeds sections and opening hours for the current phase, and keeps `pickupPoints` empty for Part 2. Products reference shops and sections, and indexes support approved-shop catalog browsing and text search.
