# Recruitment Website

Production-grade recruitment / staffing agency website. Next.js 15 (App Router, TypeScript strict), Tailwind CSS v4, shadcn/ui, Prisma + PostgreSQL (SQLite locally), fully database-driven content with an admin panel.

> Full setup, content-editing and deployment docs (`README`, `CONTENT_GUIDE.md`, `DEPLOY.md`) are completed in the final project phase. This is the Phase 1 scaffold.

## Getting started

```bash
npm install
cp .env.example .env   # fill in values
npm run dev
```

## Scripts

| Script              | Purpose                 |
| ------------------- | ----------------------- |
| `npm run dev`       | Dev server (Turbopack)  |
| `npm run build`     | Production build        |
| `npm run start`     | Serve production build  |
| `npm run lint`      | ESLint (incl. jsx-a11y) |
| `npm run typecheck` | `tsc --noEmit`          |
| `npm run format`    | Prettier write          |

## Architecture notes

- **Zero hardcoded content** — components read exclusively through the typed content layer in `src/lib/content/*` (Phase 1: typed seed data in `src/data/seed/*`; Phase 2+: Prisma).
- **Design tokens** — single source of truth in `src/app/globals.css` (`@theme`): brand scale, warm CTA accent, neutrals, semantic tokens, dark mode via `.dark` class.
- **Fonts** — Sora (display) + Inter (text), self-hosted via `next/font`.
