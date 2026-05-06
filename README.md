# 🏦 VaultEase (Easy Finance)

**Institutional-grade management for high-conviction private financial vaults.**

VaultEase is a specialized FinTech platform engineered to manage group-based liquidity pools. It is designed to facilitate a dual-role ecosystem: a **12% target yield** for capital-providing Members and **18% fixed-rate** credit access for whitelisted Borrowers. Built with a focus on high-performance engineering and transparency, it serves as the central ledger for the **Power 10** financial strategy.

---

## 💎 Core Architecture

*   **Dual-Protocol Engine:** Distinct, automated logic for **12% yield** accrual (Members) and **18% reducing-balance** interest tracking (Borrowers).
*   **Zero-Friction Onboarding:** Smart "Auto-Join" technology for existing users and tokenized whitelisting for new invites.
*   **Legal-First Verification:** Integrated **Digital-to-Physical** agreement workflow requiring self-attested **Aadhaar & PAN** submissions to the Bengaluru office.
*   **Institutional Ledger:** Real-time capital tracking with automated **January and July** portfolio review cycles.
*   **Glassmorphic UI:** A premium, high-contrast interface leveraging **React 19** and **Tailwind CSS** for a "Glass Shield" aesthetic.

---

## 🛠️ Technical Ecosystem

*   **Core:** [Next.js 15](https://nextjs.org/) (App Router, React 19, Edge Runtime).
*   **Database:** [Prisma ORM](https://www.prisma.io/) with [Neon Serverless Postgres](https://neon.tech/).
*   **Auth:** [Better Auth](https://www.better-auth.com/) (Invite-only, session-guarded).
*   **Security:** Composite **P2002** conflict handling and multi-layer `authGuard` protection.
*   **UI/UX:** [Lucide React](https://lucide.dev/), [Sonner](https://sonner.stevenly.me/) (Glassmorphic toasts), and specialized print-CSS for legal agreements.

---

## ⚙️ Engineering Setup

### 1. Environment Configuration
Create a `.env` file at the root:
```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your_secret"
```

### 2. Database Sync
Push the high-conviction schema (includes `Membership`, `AllowedUser`, and `Group` models):
```bash
npm install
npx prisma generate
npx prisma db push
```

### 3. Execution
```bash
npm run dev
```

---

## 📂 System Directory

*   `app/(auth)` — Secure invitation-based registration and login flows.
*   `app/(public)` — Informative **Terms & Conditions** and Legal Protocols.
*   `app/dashboard` — Role-aware portals for Member/Borrower management.
*   `lib/actions` — Server Actions for whitelisting, auto-joining, and agreement submission.
*   `components/dashboard` — High-reuse components: `TermsContent`, `FinalizationSteps`, and glassmorphic charts.

---

## 🛡️ Compliance Notice
VaultEase requires physical document verification. All participants must provide self-attested copies of **Aadhaar** and **PAN** to the **Bengaluru** registry to finalize vault access. This ensures legal accountability for all credit transactions within the ecosystem.

---
*Developed by Suman Kumar | Lead Frontend Engineer*