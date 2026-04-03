# RecruitIQ — AI Hiring Assistant

> AI-powered resume analysis, ATS scoring, JD matching and conversational hiring assistant.

**Stack:** Next.js 14 · TypeScript · FastAPI · Groq (LLaMA 3) · PyMuPDF · Docker · Tailwind CSS · Framer Motion

---

## Features

- 📄 **Resume Upload** — PDF parsing with PyMuPDF
- 🎯 **ATS Scoring** — AI grades resume A–F with strengths, weaknesses & keywords
- 💼 **JD Matching** — Compares resume against job description, shows skill gaps
- 🤖 **AI Chat** — Ask anything about the candidate with full context awareness
- ✨ **Animated UI** — Step-based flow with Framer Motion transitions
- 🐳 **Dockerized** — One command to run everything

---

## Demo

> Upload Resume → ATS Score → Paste JD → Match Report → Chat with AI

---

## Quick Start (Without Docker)

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/recruitiq.git
cd recruitiq
```

### 2. Backend setup
```bash
cd backend
pip install -r requirements.txt
```

Create `.env` file inside `backend/`:
```
GROQ_API_KEY=gsk_your_key_here
```
Get free key at → https://console.groq.com

Run backend:
```bash
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend setup
```bash
cd frontend
npm install
```

Create `.env.local` inside `frontend/`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run frontend:
```bash
npm run dev
```

Open → http://localhost:3000

---

## Quick Start (With Docker)

```bash
# In root folder, create .env file:
echo "GROQ_API_KEY=gsk_your_key_here" > .env

docker-compose up --build
```

Open → http://localhost:3000

---

## Project Structure

```
recruitiq/
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI app + CORS
│   │   ├── store.py              # Shared in-memory state
│   │   ├── routes/
│   │   │   ├── resume.py         # POST /api/upload-resume
│   │   │   ├── jd.py             # POST /api/submit-jd
│   │   │   └── chat.py           # POST /api/chat
│   │   └── services/
│   │       ├── groq_client.py    # Groq API wrapper
│   │       ├── ats.py            # ATS analysis prompt
│   │       └── matcher.py        # JD match prompt
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Main step orchestrator
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── UploadStep.tsx        # PDF drag & drop
│   │   ├── ATSStep.tsx           # ATS score display
│   │   ├── JDStep.tsx            # Job description input
│   │   ├── MatchStep.tsx         # Match report
│   │   ├── ChatModal.tsx         # Slide-in AI chat
│   │   ├── ScoreRing.tsx         # Animated SVG score ring
│   │   └── Stepper.tsx           # Progress indicator
│   ├── lib/
│   │   ├── api.ts                # Axios API calls
│   │   └── types.ts              # TypeScript interfaces
│   └── Dockerfile
├── docker-compose.yml
└── .env.example
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload-resume` | Upload PDF, returns ATS analysis |
| POST | `/api/submit-jd` | Submit job description, returns match report |
| POST | `/api/chat` | Chat with AI about the candidate |

---

## Tech Stack Details

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| Backend | FastAPI, Python 3.11 |
| AI Model | LLaMA 3 via Groq API (free tier) |
| PDF Parsing | PyMuPDF |
| Auth/State | JWT-ready, in-memory store |
| Deployment | Docker, Vercel (frontend), Render (backend) |

---

## Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `GROQ_API_KEY` | `backend/.env` | Free key from console.groq.com |
| `NEXT_PUBLIC_API_URL` | `frontend/.env.local` | Backend URL (default: http://localhost:8000) |
