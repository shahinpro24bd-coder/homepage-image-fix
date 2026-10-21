# QMEP Electromechanical LLC — Full Website Export

Complete source of the QMEP website: frontend pages, styling, images, the admin
panel, and the database (backend) schema.

## What is inside

| Folder / file | What it is |
| --- | --- |
| `src/routes/` | Every page: Home, About, Services, Service detail pages, Industries, Projects, AMC, Contact, plus `/admin` and `/auth` |
| `src/components/site/` | Header (navigation), footer, and the reusable page sections |
| `src/lib/site.ts` | Company details, the 6 services, FAQs — the default content the site ships with |
| `src/lib/service-details.ts` | The unique text on each service page |
| `src/lib/cms.ts` + `src/lib/cms.functions.ts` | Reads saved content from the database and merges it over the defaults |
| `src/assets/` | All 12 photos (WebP, compressed) |
| `src/styles.css` | All styling, including the custom navigation, industries, projects, about and service-page designs |
| `src/routes/api/public/img.$.ts` | Serves images uploaded from the admin panel |
| `drizzle/migrations/` | Database migrations (the same SQL is joined into `database/schema.sql`) |
| `database/schema.sql` | One file with the whole database: tables, permissions, and admin-only rules |
| `supabase/config.toml` | Backend project id |
| `.env` | Backend address and the public (publishable) key |

`node_modules` (installed packages) is not included — you recreate it with one
command, see below.

## Pages

- `/` Home
- `/about` About
- `/services` and `/services/<service>` — one page per service (hvac, electrical, plumbing, mep-maintenance, amc, vrf)
- `/industries` Industries we serve
- `/projects` Projects
- `/amc` AMC packages
- `/contact` Contact and the quote form
- `/auth` Admin sign in, `/admin` Admin panel

## Run it locally

```bash
bun install          # or: npm install
bun run dev          # starts the site at http://localhost:8080
```

Build for publishing:

```bash
bun run build
```

## The database (backend)

The site works without a database — it falls back to the content in
`src/lib/site.ts`. To make it editable from the admin panel you need a
Postgres/Supabase backend and these objects:

- `public.user_roles` — who is an admin
- `public.site_content` — the text and settings you edit in the admin panel
- `public.quote_requests` — quote-form submissions
- `public.has_role(...)` — the function that checks admin rights
- a private storage bucket named `site-images` for uploaded photos

Run `database/schema.sql` against your database to create all of that, then put
your own backend address and key into `.env` (both the plain and the `VITE_`
names are needed).

## Admin panel

Open `/auth`, sign in with username `admin` and password `admin123`. The first
time you sign in, that account is created automatically and given admin rights.
Change the password once the site is live — `admin123` is easy to guess.

In `/admin` you can change contact details, service titles and descriptions,
FAQs, upload photos, and read quote-form submissions.
