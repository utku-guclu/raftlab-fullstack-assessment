# Candidate Selection System

A fullstack application for managing and reviewing candidate applications.

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React, Vite

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:3000`

## API Endpoints

- `GET /api/candidates` - Get all candidates (paginated)
- `GET /api/candidates/stats` - Get statistics
- `GET /api/candidates/search?q=query` - Search candidates
- `GET /api/candidates/:id` - Get single candidate
- `PATCH /api/candidates/:id/status` - Update candidate status

## Features

- View all candidates with pagination
- Filter by status (pending/selected/rejected)
- Search by email or domain
- Update candidate status
- View statistics dashboard
