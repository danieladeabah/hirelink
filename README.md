# HireLink

A hiring workflow application that manages the end-to-end journey from candidate application to recruiter decision-making.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Features

### Candidate Experience

- **Job Listings** – Browse open roles with title, location, and description
- **Multi-Step Application Form**
  - Step 1: Personal info (name, email, phone)
  - Step 2: Experience & skills (years, skills, portfolio link)
  - Step 3: Resume upload (PDF/DOC, max 5MB)
- **Validation** – Required fields, email format, character limits, step-by-step checks
- **Thank You Page** – Unique application ID (e.g. `APP-A1B2C3D4`) generated on submit

### Recruiter Experience

- **Pipeline Board** – 4 stages: Applied → Reviewed → Interview Scheduled → Offer Sent
- **Candidate Review Panel** – Full application, score (1–5), notes
- **Interview Scheduler** – Date/time picker; auto-moves to "Interview Scheduled"
- **Offer Stage** – Draft Offer button, editable mock offer letter

## Tech Stack

- **Framework**: React 19 + Vite 7
- **State Management**: Zustand with `persist` middleware (localStorage)
- **Forms**: React Hook Form + Zod
- **Routing**: React Router v7
- **UI**: Tailwind CSS, Radix UI primitives

## Decisions

- **Zustand** – Chosen for low boilerplate, built-in localStorage persistence, and good fit for pipeline state
- **localStorage** – No backend; all data persists in browser
- **Vite** – Fast dev experience; existing project setup
- **Dark theme** – Matches initial design; consistent across flows

## Project Structure

```
src/
├── components/
│   ├── ui/           # Button, Input, Card, etc.
│   ├── layout/       # Header
│   ├── application-form/
│   └── recruiter/    # Pipeline, Review Panel, Scheduler, Offer
├── pages/
├── stores/
├── lib/
└── types/
```
