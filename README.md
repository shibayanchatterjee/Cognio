# Cognio

Cognio is a STEM education app for kids in Pre-K through Grade 4.

## Current implementation slice

- Vue 3 + TypeScript frontend with routing and STEM activity explorer
- No custom server component
- PostgreSQL integration through PostgREST
- Docker Compose stack for web, rest, and db services

## Tech stack

- Frontend: Vue 3, TypeScript, Vite, Vue Router
- Data API: PostgREST
- Database: PostgreSQL
- Local orchestration: Docker Compose

## Run locally

1. Install frontend packages:
   - `npm install`
2. Start PostgreSQL + PostgREST:
   - `npm run docker:db`
3. Start frontend in another terminal:
   - `npm run dev`

## Run with Docker Compose

1. Build and start all services:
	- `npm run docker:up`
2. Stop services:
	- `npm run docker:down`

Services:

- Web: http://localhost:5173
- PostgREST: http://localhost:3000
- PostgreSQL: localhost:5432

## Database integration

- SQL schema and seed are in `infra/sql/001_init.sql`
- PostgREST exposes `public.stem_activities` as REST:
	- `GET /stem_activities`
- Frontend reads from `/rest/stem_activities` via Vite proxy.

## Next implementation targets

1. Add auth provider integration (for example Supabase Auth or Auth0) without a custom server.
2. Add tables for users, child profiles, and progress tracking in Postgres.
3. Enforce row-level security policies for role-based access.
4. Add payment integration in phase 2.
