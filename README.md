# 💳 Customer Spending Insights - Full-stack (Mock)

A Capitec-themed full-stack project showcasing modern financial analytics UI and service design.

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


🧩 Overview

This project simulates a banking analytics dashboard that visualizes customer spending insights.
It aggregates spending data by category and presents it in an intuitive, responsive interface.

The system is designed to demonstrate production-ready engineering practices using:

⚡ React + TypeScript (frontend)

🧠 Node.js + Express (backend API)

🎨 Tailwind CSS (Capitec theme)

🐳 Docker (containerized runtime)

🧪 Mock in-memory data (simulating backend service behavior)

🚀 Features

📊 Category-based spending aggregation

💰 Mock financial data simulation

🧠 API-first architecture (/api/insights/categories)

🎨 Responsive, Capitec-branded UI

🧱 Modular, production-grade TypeScript setup

🐳 Dockerized for easy deployment

🧾 Includes complete README & instructions for build/run/test

🧰 Tech Stack
Layer	| Stack
Frontend	| React, TypeScript, Vite, Tailwind CSS, Recharts
Backend	| Node.js, Express, TypeScript
Containerization	|Docker, Docker Compose
Styling	| Capitec Bank color palette
Data	| In-memory mock seed data


🧮 Example API Response

Endpoint: GET /api/insights/categories

`[
  { "category": "Groceries", "total": 1650 },
  { "category": "Transport", "total": 1000 },
  { "category": "Entertainment", "total": 900 }
]`



