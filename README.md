# 🏦 Easy Finance (VaultEase)

> **Secure, transparent, and easy management for private group financial vaults.**

Easy Finance (VaultEase) is a modern Next.js platform built to manage group savings, lending, and peer-to-peer liquidity. Designed for the Power 10 financial ecosystem, it handles 12% target yield savings and 18% fixed-rate loan management with an institutional-grade ledger.

## ✨ Key Features

* **Smart Ledger:** Digital group accounting and capital tracking.
* **Role-Based Portals:** Dedicated, secure dashboards for Members and Borrowers.
* **High Security:** Invite-only access, end-to-end encrypted authentication using Better Auth.
* **Growth Analytics:** Real-time sync for fair splits and high-yield interest tracking.
* **Modern UI:** Responsive, premium glass-morphic interface built with Tailwind CSS.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
* **Database:** [Prisma ORM](https://www.prisma.io/) with [Neon PostgreSQL](https://neon.tech/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Authentication:** Better Auth
* **Icons & UI:** [Lucide React](https://lucide.dev/), Sonner (Toasts)

## 🚀 Project Setup

```bash
npm install
```

### Environment

Create a `.env` file at the root of the project and add your required values:

```env
DATABASE_URL=your-database-connection-string
```

> If you are using Prisma with Neon, your `DATABASE_URL` should match the Neon connection string format.

### Database

Generate the Prisma client and push the schema to the database:

```bash
npx prisma generate
npx prisma db push
```

### Development

Run the local development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

- `npm run dev` — start the Next.js dev server
- `npm run build` — build the production app
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## App structure

- `app/` — application routes and layout
- `components/` — reusable UI components
- `lib/` — utility modules and database helpers
- `public/` — static assets
- `prisma/` — Prisma schema and migrations (if present)

## Notes

- The project includes a mobile hamburger menu for smaller screens
- `app/loading.tsx` is used for route loading states

## Troubleshooting

- If Prisma fails, verify `DATABASE_URL` and re-run `npx prisma db push`
- If the app hydration warning occurs, check `app/layout.tsx` for `suppressHydrationWarning`
