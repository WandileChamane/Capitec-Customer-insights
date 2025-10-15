# Customer Spending Insights - Full-stack (Mock)

This bundle includes:
- backend/: Node + TypeScript mock API (port 4000)
- frontend/: Vite + React + TypeScript app (port 3000)

Development:
1. Install dependencies for backend and frontend
2. Navigate into the backend folder and run `npm run seed`, this step is important to generate mock data.
3. To start the API run `npm run start` inside your terminal inside the backend folder.
4. To start the Frontend run `npm run dev` inside your terminal inside the fronend folder.
5. Optionally to run quickly with Docker Compose:
   docker compose up --build
6. Frontend proxies /api to the backend in dev.

Theme: approximate Capitec bank palette (brand red + gold accents).

Notes:
- Run `npm run seed` inside backend to generate seed-data.json if you want deterministic data.
