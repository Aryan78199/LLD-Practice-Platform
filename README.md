# LLD Practice Platform

A focused 2-day engineering prototype for practicing Low-Level Design.

## Product loop

Choose problem → Think/design → Submit → Get feedback → Review → Try again

## Features

- Three LLD problems: Parking Lot, Vending Machine, Elevator
- Solution submission using a text editor
- Deterministic rule-based evaluation
- Structured feedback: score, strengths, issues and suggestions
- Attempt history
- Retry flow
- Backend tests including validation and edge cases
- AI usage and design decision documentation

## Tech stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Persistence for prototype: in-memory arrays
- Testing: Node.js built-in test runner

## Requirements

Node.js 18+ and npm.

## Run

From the project root:

```bash
npm install
npm run install-all
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:4000

## Run tests

```bash
npm test
```

## API

- `GET /api/health`
- `GET /api/problems`
- `GET /api/problems/:id`
- `POST /api/submissions`
- `GET /api/attempts`
- `GET /api/attempts/:id`

## Prototype trade-off

The prototype intentionally uses in-memory storage to keep the assignment focused on LLD and the learner feedback loop. A production version would replace this with PostgreSQL/MongoDB, authentication, durable submissions, queues, and an LLM feedback service.

## Important documents

- `docs/RESEARCH_NOTE.md`
- `docs/DESIGN_NOTE.md`
- `docs/AI_USAGE.md`
- `docs/DECISIONS.md`
- `docs/RESEARCH_NOTE.pdf`
- `docs/DESIGN_NOTE.pdf`
