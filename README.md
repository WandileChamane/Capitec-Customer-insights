# Customer Spending Insights - Full-stack (Mock)

This bundle includes:
- backend/: Node + TypeScript mock API (port 4000)
- frontend/: Vite + React + TypeScript app (port 3000)

Development:
1. Install dependencies for backend and frontend (or use docker-compose)
2. To run quickly with Docker Compose:
   docker compose up --build
3. Frontend proxies /api to the backend in dev.

Theme: approximate Capitec bank palette (brand red + gold accents).

Notes:
- Run `npm run seed` inside backend to generate seed-data.json if you want deterministic data.
