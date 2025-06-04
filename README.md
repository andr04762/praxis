# Prax

Freemium e-learning platform for healthcare data analytics.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Deployment

Deploy on Vercel. The install step only runs `prisma generate` to avoid failing
without a database. After provisioning a Postgres database, run
`npx prisma migrate deploy` followed by `npm run seed` to create demo lessons.
