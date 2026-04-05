# Easy Finance

Easy Finance is a Next.js app built with React 19, Tailwind CSS, Clerk authentication, and Prisma for database access. It provides a finance dashboard and member reporting interface with secure sign-in and user data storage.

## Features

- Next.js App Router
- Clerk auth (`@clerk/nextjs`)
- Prisma ORM with Neon adapter
- Tailwind CSS styling
- Responsive navbar with mobile menu
- Member dashboard and monthly report pages

## Project setup

```bash
npm install
```

### Environment

Create a `.env` file at the project root and add the required values:

```env
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
CLERK_API_KEY=your-clerk-api-key
CLERK_JWT_KEY=your-clerk-jwt-key
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

- The navbar uses Clerk `SignInButton` and `SignOutButton`
- The project includes a mobile hamburger menu for smaller screens
- `app/loading.tsx` is used for route loading states

## Troubleshooting

- If Clerk auth fails, verify Clerk environment variables
- If Prisma fails, verify `DATABASE_URL` and re-run `npx prisma db push`
- If the app hydration warning occurs, check `app/layout.tsx` for `suppressHydrationWarning`
