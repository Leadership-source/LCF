# Leadership Conference Forum Frontend

Production frontend for Leadership Conference Forum, built with React, TypeScript, Vite, and Tailwind CSS.

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- Access to the LCF API

## Local Setup

```bash
npm install
```

Create `.env.local` from `.env.example`:

```env
VITE_API_URL=https://lcf-api-c228.onrender.com
VITE_SITE_URL=https://leadershipconferenceforum.org
```

Use `http://localhost:3000` when running the backend locally.

## Commands

```bash
npm run dev      # Start the Vite development server
npm run build    # Type-check and create the production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Application Areas

Public routes include the home page, about page, events, teams and external roles, news, contact, get involved, legal notice, and quote invitation pages.

Admin routes are protected by authentication and include the dashboard, teams, events, news, testimonials, quotes, volunteer applications, partners, external roles, and settings. User management is restricted to superadmins.

## API Configuration

The frontend uses `VITE_API_URL` as the Axios base URL and sends credentials with requests. Admin requests attach the stored admin token. The backend remains responsible for authorization, validation, file storage, email delivery, and database access.

Implemented API-backed workflows include:

- Two-step admin login with a six-digit email verification code
- Password reset and authenticated password change
- Superadmin user creation with optional backend-generated password and welcome email
- Team, partner, quote, news, testimonial, and external-role management
- Dynamic volunteer options, availability, submissions, admin review, and read status
- Public external roles grouped by role type
- Optional quote images and image uploads for quote invitations

## Deployment

The project is configured for a static deployment on Render:

- Build command: `npm install && npm run build`
- Publish directory: `dist`
- SPA fallback: all routes rewrite to `index.html`

Set `VITE_API_URL` in the deployment environment before building. Do not commit `.env.local`, API tokens, or other secrets.

Set `VITE_SITE_URL` to the production domain so canonical links, social sharing metadata, structured data, and the sitemap use the correct URL. The app uses browser history routing, so the host must rewrite unknown paths to `index.html`.

SEO files are served from `/robots.txt` and `/sitemap.xml`. The sitemap currently lists the public, indexable routes; dynamic event and news detail URLs can be added when their content strategy is finalized.

## Handover Checklist

1. Confirm the production API URL is configured in the deployment environment.
2. Run `npm install` and `npm run build`.
3. Verify public pages, admin login verification, and role-based access.
4. Verify image uploads are under the backend's 5MB limit.
5. Verify welcome emails, volunteer notifications, quote notifications, and password reset emails in the backend email provider.
6. Confirm the deployed frontend can reach the production API.

## Repository Notes

The frontend does not contain backend credentials or email-provider configuration. Those values belong in the backend deployment environment. The API is the source of truth for published content and authentication state.
