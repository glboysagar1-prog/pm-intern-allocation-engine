# PM Intern Allocation Engine — Full Demo

This repo includes a full-featured demo of an AI-based intern allocation engine:
- **Backend**: FastAPI serving allocation results from sample data.
- **Frontend**: React + Vite + Three.js + GSAP visualization (interactive 3D galaxy + 2D fallback).
- **Docker**: docker-compose for easy local development.

## Quick start (dev)

1. Build & run with docker-compose (recommended):
```bash
docker-compose up --build
```

2. Frontend: http://localhost:3000
   Backend API: http://localhost:8000/api/allocations

If not using Docker, run backend and frontend separately:

Backend:
```bash
cd backend
python -m pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Notes
- Frontend proxies `/api` to the backend (Vite config).
- Avatars are placeholder images; replace `frontend/public/avatars/*.jpg` with real photos.
- This is a demo scaffold — adapt allocation_engine.py to your real HR rules.
