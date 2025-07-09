# Quiz App

A simple, statically-exportable quiz application built with **Next.js 15 App Router**, **React 19 RC**, **TypeScript**, and **Tailwind CSS**. The app lets users register with a name, answer five multiple-choice questions, and compete for the highest score on a realtime leaderboard.

> **Note**  
> The leaderboard data is stored **in-memory** on the server via Next.js Server Actions. Scores reset whenever the process restarts (e.g. during local reloads or after a redeploy). Use a persistent database if you need permanent storage.

---

## Table of Contents

1. [Demo](#demo)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Architecture Overview](#architecture-overview)
7. [Scripts](#scripts)
8. [Styling System](#styling-system)
9. [Extending the App](#extending-the-app)
10. [Contributing](#contributing)
11. [License](#license)

---

## Demo

```bash
npm run dev
```

Open <http://localhost:3000> in your browser and you should see:

- A registration card asking for your name.
- A multiple-choice quiz (five questions).
- A leaderboard that updates automatically when you finish.

![Quiz Screenshot](public/window.svg)

> Replace the above image with a real screenshot or GIF if available.

---

## Features

- 🔐 **Name registration** – Simple form that creates a user session in memory.
- ❓ **Multiple-choice quiz** – Five curated questions with single correct answer.
- 🏆 **Leaderboard** – Shows the top 10 players ordered by highest score.
- ♻️ **Play again** – Players can replay the quiz without refreshing the page.
- ⚡ **Server Actions** – Uses Next.js “use server” functions for mutable data actions (`registerUser`, `submitScore`, `getLeaderboard`).
- 📦 **Static export** – `output: "export"` in `next.config.ts` lets you host the compiled site on any static host (e.g. GitHub Pages, Netlify, S3).
- 🎨 **Tailwind CSS** – Utility-first styling with custom CSS variables + dark mode.
- 🧩 **Radix UI & shadcn/ui primitives** – Accessible building blocks for inputs, buttons, cards, and tables.

---

## Tech Stack

| Layer | Package / Tool | Version |
|-------|----------------|---------|
| Framework | [Next.js](https://nextjs.org/) | 15.0.3 |
| View | [React](https://react.dev/) | 19 RC |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS + class-variance-authority | 3.4 |
| UI Primitives | Radix UI, shadcn/ui | see `package.json` |
| State / Data | Next.js Server Actions (in-memory) | – |

---

## Getting Started

### Prerequisites

- **Node.js ≥ 18** (Next.js 15 recommends the latest LTS or 20+).
- **npm** 9 or **pnpm**, **yarn**, or **bun**.

### Installation

```bash
# clone the repo
git clone https://github.com/<your-username>/quiz-app.git
cd quiz-app

# install dependencies
npm install # or pnpm install / yarn / bun install
```

### Development

```bash
npm run dev
```

The dev server starts at <http://localhost:3000>. HMR is enabled – changes reflect instantly.

### Production build

```bash
npm run build     # next build
npm run start     # next start (Node.js server)
```

### Static export (optional)

Because `output: "export"` is set, you can also generate a fully static site:

```bash
npm run build     # builds
# after build completes:
node scripts/next-export.js   # or `next export` directly if installed globally
```

The static site lives in the `build/` directory.

---

## Project Structure

```
quiz-app/
├── public/               # static assets (SVGs, favicon, screenshots, …)
├── src/
│   ├── app/              # Next.js App Router directory (routes)
│   │   ├── components/   # feature-specific React components
│   │   │   ├── Quiz.tsx
│   │   │   └── Leaderboard.tsx
│   │   ├── utils/        # quizQuestions.ts (static data)
│   │   ├── actions.ts    # server actions – registerUser, submitScore, …
│   │   ├── page.tsx      # "/" route – main UI & logic
│   │   └── layout.tsx    # root layout & global styles
│   ├── components/ui/    # shared shadcn/ui primitives (Button, Card, …)
│   └── lib/              # generic utilities (e.g. `cn` classnames helper)
├── tailwind.config.ts    # Tailwind theme & plugin config
├── postcss.config.mjs    # PostCSS setup for Tailwind
├── next.config.ts        # Next.js build & export options
└── tsconfig.json         # TypeScript compiler settings
```

---

## Architecture Overview

### Data Flow

1. **Registration** (`registerUser`)  
   Stores `{ name, score: 0 }` in an in-memory `users` array and triggers `revalidatePath('/')` to refresh.
2. **Quiz Play** (`Quiz` component)  
   Manages local state for the current question, selected answer, and running score.
3. **Score Submission** (`submitScore`)  
   Updates the corresponding user’s `score`, sorts the array, and calls `revalidatePath('/')` again.
4. **Leaderboard Fetch** (`getLeaderboard`)  
   Returns top 10 users; invoked client-side via `useEffect` to hydrate the board.

### Styling & Components

- **shadcn/ui primitives** (Button, Card, Input, RadioGroup, Table) are composed with Tailwind classes and class-variance-authority variants for consistent theming.
- **Tailwind CSS** config extends CSS variables so you can adjust the color palette globally in `globals.css`.

### Build & Export

- `next build` creates the production `.next` output.
- With `output: "export"` the build is followed by a static export to `build/`.

---

## Scripts

| Script | Purpose |
|--------|---------|
| `dev` | Start the Next.js development server with HMR |
| `build` | Compile the application for production |
| `start` | Run the built app with Node.js |
| `lint` | Run ESLint with Next.js rules |

---

## Styling System

The design system is powered by **Tailwind CSS** with class-variance-authority for variant handling.

1. **Atomic utilities** – direct Tailwind classes in markup keep styles colocated.
2. **Design tokens** – CSS variables (e.g. `--primary`, `--secondary`) defined in `globals.css` allow theme swapping or design system extensions.
3. **Dark Mode** – Enabled via the `class` strategy; add `class="dark"` to the `<html>` tag to preview.

---

## Extending the App

| Task | File(s) to edit |
|------|----------------|
| Change quiz questions | `src/app/utils/quizQuestions.ts` |
| Persist data in a DB | Replace logic in `src/app/actions.ts` with calls to your database (PostgreSQL, MongoDB, Redis, …) |
| Add more pages (e.g. About) | Create a new folder in `src/app/about/page.tsx` |
| Customize styling | Update Tailwind classes or extend `tailwind.config.ts` |

---

## Contributing

1. Fork the repository and create your branch from `main`.
2. Commit your changes following Conventional Commits.
3. Ensure `npm run lint` passes.
4. Open a pull request describing your changes.

---

## License

This project is MIT-licensed. See [LICENSE](LICENSE) for details.
