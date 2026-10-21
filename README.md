# Resume / Portfolio

A bilingual (Turkish / English) personal resume website with a private admin panel. Content such as profile, experience, education and skills is stored in PostgreSQL and managed from the admin panel. Public pages are cached with the Next.js Cache Components model and refreshed automatically when content changes.

## Features

**Public site**
- Single-page resume with Banner, Experience, Education, Skills and Contact sections
- Internationalization with `next-intl` (`tr` default, `en`), locale prefix only for non-default locale
- Downloadable CV (PDF) in both languages
- Contact form protected by Cloudflare Turnstile and rate limiting
- Scroll-based active section highlighting and slide-in animations

**Admin panel (`/admin`)**
- Session-based authentication (signed JWT in an HTTP cookie)
- Optional two-factor authentication (TOTP, QR code setup)
- CRUD for profile, experience, education and skills (per language)
- Contact message inbox
- Settings page (two-factor setup)
- Routes are protected in `src/proxy.js`; server actions additionally call `requireSession()`

**Security**
- Personal data columns (name, email, social links, etc.) are encrypted at rest with AES-256-GCM
- Email lookups use an HMAC hash so encrypted emails remain searchable
- Passwords hashed with `bcryptjs`
- Rate limiting for login, TOTP and contact form via Upstash Redis
- Security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| UI | React 19, Tailwind CSS 4, lucide-react, react-icons |
| i18n | next-intl |
| Database | PostgreSQL (Neon), Drizzle ORM, drizzle-kit |
| Auth | jose (JWT), bcryptjs, otplib (TOTP), qrcode |
| Rate limiting | Upstash Redis + `@upstash/ratelimit` |
| Bot protection | Cloudflare Turnstile |
| Forms / Tables | Formik, Yup, TanStack Table |
| Dates | dayjs |

## Project Structure

```
src/
├── app/
│   ├── (web)/[locale]/        # Public localized site
│   └── (admin)/admin/         # Admin panel (auth, dashboard, profile, ...)
├── components/
│   ├── site/                  # Public site components
│   └── admin/                 # Admin UI components
├── i18n/                      # next-intl routing and request config
├── lib/                       # Encryption, session, TOTP, rate limit, Turnstile
├── server/
│   ├── actions/               # Server Actions (entry points, auth checks, cache invalidation)
│   ├── service/               # Business logic and cached reads ("use cache")
│   ├── repository/            # Database queries (Drizzle)
│   └── db/                    # Schema, custom types, DB client
├── proxy.js                   # i18n routing + admin route protection
messages/                      # Translation files (en.json, tr.json)
drizzle/                       # Generated SQL migrations
public/                        # Static assets and CV PDFs
```

The server code follows a layered flow: **component → action → service → repository**.

## Caching

Public reads use the Next.js Cache Components model:

- Read functions in the service layer use `"use cache"` with `cacheTag(...)` and `cacheLife("max")`.
- Write operations in server actions call `updateTag(...)` after a successful mutation, so the affected cache entries are refreshed immediately.
- Admin reads (by id, paginated lists) are intentionally not cached.

`cacheTag` and `updateTag` must use the same tag string, so keep tags in one shared constants file.

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (for example [Neon](https://neon.tech))
- An [Upstash Redis](https://upstash.com) database
- A [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) site

### Installation

```bash
git clone <your-repo-url>
cd resume
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require

# Encryption (both must be Base64-encoded 32-byte keys)
ENCRYPTION_KEY=
LOOKUP_KEY=

# Session
SESSION_SECRET=          # at least 32 characters
SESSION_MAX_AGE=1        # session lifetime in days
projectV=1.0.0           # bump to invalidate all existing sessions

# Upstash Redis (rate limiting)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Generate a 32-byte Base64 key with:

```bash
openssl rand -base64 32
```

> **Important:** Never change `ENCRYPTION_KEY` or `LOOKUP_KEY` after data has been stored. Existing encrypted data and email lookups would become unreadable. Never commit `.env`.

### Database

Apply the migrations in `drizzle/` to your database:

```bash
npx drizzle-kit migrate
```

During development you can also push the schema directly:

```bash
npx drizzle-kit push
```

To generate a new migration after changing the schema in `src/server/db/schema/`:

```bash
npx drizzle-kit generate
```

### Admin user

The app has no public sign-up. Create the first admin user directly in the `users` table. The password must be hashed with bcrypt, and the email, name and other protected columns must be stored through the app's encryption helpers (`src/lib/encryption.js`, `src/lib/lookup.js`).

### Run

```bash
npm run dev      # development server at http://localhost:3000
npm run build    # production build
npm start        # run the production build
npm run lint     # lint the code
```

The admin panel is available at `/admin`. Unauthenticated visitors are redirected to `/admin/auth`.

## Deployment

The project is designed for [Vercel](https://vercel.com):

1. Import the repository in Vercel.
2. Add all environment variables listed above.
3. Deploy. Public pages are prerendered and refreshed when you edit content from the admin panel.

## Adding a language

1. Add the locale to `src/i18n/routing.js`.
2. Create `messages/<locale>.json`.
3. Add a row to the `languages` table with the matching uppercase code (for example `DE`).
4. Add profile, experience, education content for the new language from the admin panel.

## License

Personal project. All rights reserved.