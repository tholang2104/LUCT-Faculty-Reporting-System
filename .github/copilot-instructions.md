## Quick context (what this repo is)

- Full-stack (React frontend + Express/MySQL backend) for LUCT Faculty Reporting System.
- Backend: Node/Express, MySQL2, JWT auth, Excel export. Key entry: `backend/server.js`.
- Frontend: Create React App (react-scripts), axios, Recharts. Key entry: `frontend/src/App.js`.

## Primary workflows an AI should know

- Run backend (dev): `cd backend && npm install && npm run dev` (uses `nodemon server.js`). See `backend/package.json`.
- Run frontend (dev): `cd frontend && npm install && npm start`. Frontend expects `REACT_APP_API_URL` in `frontend/.env`.
- DB schema is at `backend/database/schema.sql`. Backend uses `backend/.env` (copy from `.env.example`).

## Important environment variables (names used in code)

- Backend `.env`: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT, JWT_SECRET, CLIENT_URL, NODE_ENV. (See `backend/config/database.js` and `backend/server.js`.)
- Frontend `.env`: REACT_APP_API_URL (used in `frontend/src/context/AuthContext.js`).

## Auth & API conventions (concrete examples)

- Authentication: JWT sent in Authorization header as `Bearer <token>`. Server verifies in `backend/middleware/auth.js`.
- Frontend stores token in `localStorage` under key `token` and sets axios default header in `AuthContext` (`frontend/src/context/AuthContext.js`).
- Protected routes use `PrivateRoute` which checks `isAuthenticated` and optional `allowedRoles` (see `frontend/src/components/PrivateRoute.js` and `frontend/src/App.js`).

## Code structure and patterns to follow

- Controllers expose functions used by route files under `backend/controllers/*.js` and wired in `backend/routes/*.js`. Follow the pattern in `authController.js` + `authRoutes.js` when adding endpoints.
- Database calls use `mysql2/promise` pool and `pool.execute(...)` (see `backend/config/database.js`). Prefer parameterized queries (the project already uses `?` placeholders).
- Error handling: controllers return JSON { success: boolean, message, ... } and rely on global error handler in `server.js`.

## Common tasks & where to make changes

- Add a new API route: create controller in `backend/controllers/`, add route in `backend/routes/` and mount it in `backend/server.js`.
- Add a new frontend page: create a file under `frontend/src/pages/<Role>/`, import and wire in `frontend/src/App.js` and protect via `PrivateRoute` if needed.

## Debugging tips (concrete checks)

- If profile calls fail, verify `REACT_APP_API_URL` (frontend) and that backend `PORT` + `CLIENT_URL` match. Health endpoint: `/api/health` (see `server.js`).
- Check logs produced by `server.js` on startup — it prints API base URL and default test credentials.
- DB errors: confirm `backend/.env` matches MySQL credentials and run `mysql -u <user> -p luct_reporting < backend/database/schema.sql` to recreate tables.

## Notable endpoints to reference in prompts/examples

- Auth: `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/profile` (protected).
- Reports: `GET /api/reports`, `POST /api/reports`, `GET /api/reports/export/excel` (Excel export implemented server-side).
- Courses & Ratings: `GET /api/courses`, `POST /api/ratings`.

## Small, concrete examples you can reuse

- Example: verifying token on server side (already implemented in `backend/middleware/auth.js`): expect header `Authorization: Bearer <token>` and use `jwt.verify(process.env.JWT_SECRET)`.
- Example: axios base URL set in `AuthContext`: `axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'`.

## Constraints and conventions (do not invent)

- Do not change env variable names. They are read directly in code (see files referenced above).
- Follow existing JSON response shape `{ success: boolean, message: string, ... }`.
- Use parameterized SQL queries with `?` placeholders — the codebase expects `pool.execute(query, params)`.

---
If any section is unclear or you'd like the file to include more examples (for adding tests, CI, or deployment steps), tell me which area and I'll iterate. 

## Short walkthroughs (copy-paste friendly)

1) Add a small protected API route (backend)

- Create controller: `backend/controllers/exampleController.js` with named exports (see existing `authController.js` for style). Example functions: `publicHello`, `protectedHello`, `adminHello`.
- Create route file: `backend/routes/exampleRoutes.js` and export an Express router. Mount at `/api/example` in `backend/server.js` by adding:

	app.use('/api/example', require('./routes/exampleRoutes'));

- Protect endpoints using `verifyToken` and `checkRole` from `backend/middleware/auth.js` (example route file shows usage).

2) Add a frontend page + protected route (frontend)

- Create page files under `frontend/src/pages/<Scope>/` (this project uses role folders: `Lecturer`, `PL`, `PRL`, `Student`). For an example, add `frontend/src/pages/Example/PublicExample.js` and `ProtectedExample.js`.
- Use `axios` to call backend endpoints. Axios base URL is configured in `frontend/src/context/AuthContext.js` (uses `REACT_APP_API_URL`). The `AuthContext` automatically attaches `Authorization: Bearer <token>` when present.
- Wire routes in `frontend/src/App.js`. Add a public route:

	<Route path="/example/public" element={<PublicExample />} />

	and a protected group:

	<Route path="/example" element={<PrivateRoute /> }>
		<Route path="protected" element={<ProtectedExample />} />
	</Route>

This repo already includes a small example implementation: `backend/routes/exampleRoutes.js`, `backend/controllers/exampleController.js`, `frontend/src/pages/Example/PublicExample.js`, and `frontend/src/pages/Example/ProtectedExample.js`.

---
Done — ask me to expand these walkthroughs into a PR template, or to add a GitHub Actions workflow for build/test lint if you want CI examples next.
