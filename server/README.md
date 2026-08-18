# LocalConnect API

The LocalConnect API is an Express and Prisma service for neighborhood updates, issue reporting, community events, and local recommendations.

## Requirements

Node.js 18 or later, npm, and PostgreSQL are required for local development.

## Setup

```bash
cd server
npm install
cp .env.example .env
```

Set the database connection in `server/.env`:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/localconnect"
PORT=5000
```

Create the schema and optional sample data:

```bash
npx prisma migrate dev --name localconnect-community-features
npm run seed
```

Start the API:

```bash
npm start
```

The service listens on `http://localhost:5000` by default.

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` / `POST` | `/posts` | List or create neighborhood updates. |
| `GET` / `POST` / `PATCH` | `/issues` | List, report, or update local issues. |
| `GET` / `POST` / `DELETE` | `/events` | List, publish, or remove community events. |
| `GET` / `POST` | `/recommendations` | List or share trusted local recommendations. |
| `GET` | `/metrics` | Return community activity counts for the dashboard. |

## Hosting

Deploy the `server` directory to a Node-compatible service such as Render or Railway. Configure `DATABASE_URL` with the hosted PostgreSQL connection string and set the service start command to `npm start`. The frontend should use the resulting public API URL through the `VITE_API_URL` build variable.

  
