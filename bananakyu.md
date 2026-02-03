# 🛠️ BananaKyu: Job Hunt Tracker (MVP & Pro Roadmap)

**BananaKyu** is a high-performance web app designed for those in "the grind"—turning the chaotic job search into a structured path toward a dream career.

---

## 🚀 Feature Breakdown

### 🎯 Phase 1: The MVP (Core Utility)

_Focus: Speed and organization. Solve the problem of "Where did I apply?"_

- **Job Pipeline (Board/List View):** Visualize the journey from "To Apply" → "Applied" → "Interview" → "Offer."
- **Quick Add:** A streamlined form to log company, position, and job URL.
- **The Logbook:** Simple markdown-supported notes for each job (interview dates, contact names).
- **Smart Search:** Quickly filter your applications by company name or status.
- **Personalized Vault:** Secure user accounts where your data is private and persistent.

### 💎 Phase 2: The Pro Version (Efficiency & AI)

_Focus: Automation and competitive edge. Make users pay to save time._

- **The "Auto-Scraper" Extension:** A Chrome extension to clip job details from LinkedIn/Indeed directly into BananaKyu.
- **Insight Dashboard:** Analytics on your "Conversion Rate" (e.g., Application vs. Interview ratio).
- **AI Resume Tailor:** Use LLMs to compare your resume against a job description and suggest edits.
- **Interview Simulator:** AI-generated mock questions based on the specific job description.
- **Calendar Sync:** Automatic reminders for upcoming interviews synced to Google/Outlook.
- **Document Vault:** Link specific versions of resumes and cover letters to each application.

---

## 💻 2026 Modern Tech Stack

| Layer          | Technology                   | Purpose                                                         |
| :------------- | :--------------------------- | :-------------------------------------------------------------- |
| **Frontend**   | **Next.js 16 (App Router)**  | React framework for speed, SEO, and Server Components.          |
| **Styling**    | **Tailwind CSS + shadcn/ui** | Rapid, professional UI design with accessible components.       |
| **API Layer**  | **tRPC (latest)**            | End-to-end typesafe API without writing manual fetch calls.     |
| **Database**   | **Supabase (PostgreSQL)**    | Scalable, relational database with built-in real-time features. |
| **ORM**        | **Drizzle ORM**              | Type-safe database client for high-performance SQL.             |
| **Auth**       | **Supabase Auth (SSR)**      | Secure session management using server-side rendering.          |
| **Validation** | **Zod**                      | Schema validation for both frontend forms and backend APIs.     |
| **Storage**    | **Supabase Storage**         | Secure file storage for resumes and cover letters.              |
| **AI**         | **OpenAI API**               | AI-powered resume tailoring and interview simulation.           |
| **State**      | **Zustand**                  | Global state management for the application.                    |

---

## 📈 Stages of Development

### Stage 1: Infrastructure & Scaffolding

- [ ] Initialize T3 project (`create-t3-app`).
- [ ] Connect Supabase project and local `.env` setup.
- [ ] Configure Drizzle and push initial schema to Postgres.

### Stage 2: Identity (Auth)

- [ ] Implement Supabase SSR middleware for session persistence.
- [ ] Build "Sign Up" and "Login" pages using shadcn/ui.
- [ ] Secure the `/dashboard` route so only logged-in users can enter.

### Stage 3: The Data Bridge (tRPC)

- [ ] Create `protectedProcedure` in tRPC to verify user context.
- [ ] Write the `addJob` mutation (Drizzle `insert`).
- [ ] Write the `getJobs` query with user-specific filtering.

### Stage 4: The Core Dashboard

- [ ] Build the main Job Table/Board using shadcn components.
- [ ] Implement "Edit Status" functionality (The "Grind" loop).
- [ ] Add basic Search and Filter logic.

### Stage 5: Polishing & Launch

- [ ] Add "Empty States" and loading skeletons for a pro feel.
- [ ] Deploy to Vercel.
- [ ] Final bug-squash and mobile responsiveness check.

---

## 🏗️ Future Learning Opportunities

- **AI Integration:** Learning how to stream OpenAI/Vercel AI responses.
- **Browser Extensions:** Learning how to bridge a Chrome Extension with a Next.js API.
- **Payments:** Integrating Stripe for the Pro subscription tier.
