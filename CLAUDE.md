# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Online tutoring marketplace platform (Preply-inspired) connecting learners with tutors for live 1-on-1 lessons. Currently in pre-development — the `documentation/MVP_Launch_Plan_Tutoring_Platform.pdf` contains the full spec.

**Core loop:** Search tutor → View profile → Book trial lesson → Pay → Attend lesson → Subscribe for more. Every feature must support this loop or be deferred.

## Tech Stack

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth.js (Auth.js) — configurable providers (Google, Email/Password, Facebook)
- **Payments:** Stripe Connect (marketplace model with configurable commission)
- **Video:** Daily.co (default, swappable via env)
- **i18n:** next-intl — locale-prefixed URLs (`/en/tutors`, `/es/tutores`, `/fr/tuteurs`)
- **Email:** Resend + React Email
- **File Storage:** S3-compatible (AWS S3 / Cloudflare R2)
- **Search:** PostgreSQL full-text search (MVP), Meilisearch upgrade path via env
- **Hosting:** Vercel (default)

## Commands

Once the project is initialized:

```bash
npm run dev              # Start development server
npm run build            # Production build
npm run lint             # ESLint
npx prisma migrate dev   # Run database migrations
npx prisma db seed       # Seed development data
npx prisma studio        # Visual database browser
npx playwright test      # E2E tests (Phase 4)
```

## Architecture Principles

### Configuration Over Code

Nothing user-facing is hardcoded. Three-tier config system:

1. **Tier 1 — Environment Variables (.env):** Infrastructure secrets (DB URL, Stripe keys, auth credentials). Requires redeploy.
2. **Tier 2 — Database (`PlatformConfig` table):** Business settings (commission rates, subjects, pricing, feature flags, email/SEO templates). Changeable in real-time via admin panel.
3. **Tier 3 — Translation files (i18n):** All UI strings by namespace (`common`, `auth`, `tutor`, `booking`, `admin`, `seo`). Loaded at build time with ISR revalidation.

**Key rule:** If a value might ever change without a code deploy, it goes in Tier 2 or Tier 3. Only true infrastructure secrets in Tier 1.

### Multi-Language Native

i18n is not a bolt-on. All routes are locale-prefixed. Slug translations are stored in DB per locale. RTL support (Arabic, Hebrew) is a configurable flag per locale. Every page gets hreflang tags linking all locale variants.

### SEO-First Rendering Strategy

- **ISR:** Homepage (60s), subject landing pages (5min), tutor profiles (60s)
- **SSR:** Tutor search/listing (per request, filters create unique URLs)
- **SSG:** Blog/content pages
- **CSR:** Dashboards, booking/checkout (authenticated, no SEO value)

Use React Server Components for SEO-critical pages. Client components only where interactivity is needed (booking widget, chat, filters).

### Programmatic SEO Pages

Auto-generated landing pages for every subject + language + city combination. All generated from configurable templates populated with live tutor data. Slugs, titles, and descriptions are configurable per locale.

## Database Schema (Core Entities)

User (single table, role: LEARNER/TUTOR/ADMIN) → TutorProfile (extends User for tutors) → Subject (hierarchical, self-referencing `parent_id`) → TutorSubject (many-to-many with expertise_level) → Availability (recurring weekly + date overrides, stored in UTC) → Booking (PENDING/CONFIRMED/COMPLETED/CANCELLED, type: TRIAL/REGULAR) → Payment (linked to booking, tracks platform_fee and tutor_payout) → Subscription (recurring lesson packages) → Review (1-5 rating + comment) → Message (sender/receiver with optional booking link) → PlatformConfig (key-value JSON store) → Translation (locale/namespace/key/value) → LandingPage (programmatic SEO pages with slug_translations JSON)

All enum values and configurable labels are stored in DB tables, not as code-level constants.

## API Design

RESTful routes under `/api/`. Consistent response format with pagination, error codes, and locale-aware data. Auth levels: Public, Auth (any logged-in user), Learner, Tutor, Admin, Stripe (webhook verification).

## User Roles

Three roles stored in DB: **Learner** (search, book, pay, review), **Tutor** (profile, availability, dashboard, earnings), **Admin** (full config, user management, subjects, templates). Separate onboarding flows for learner vs tutor registration.

## Key Patterns

- All times stored in UTC, displayed in user's local timezone
- Stripe Connect: learner pays → platform holds → lesson completed → tutor gets paid (minus commission)
- Trial lessons limited to one per tutor-learner pair, configurable price (can be $0)
- Feature flags in DB toggle: video lessons, group classes, messaging, reviews
- JSON-LD structured data on all public pages (Organization, Person, Course, BreadcrumbList, AggregateRating)
