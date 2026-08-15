# Pilot

Pilot is an intelligent Next.js application designed with an automated browser agent and a prompt optimization loop.

## Architecture

The codebase is organized with a clear separation of concerns in the `src/lib/` directory:

- **`/src/app`**: Next.js App Router for all user interface components and pages.
- **`/src/lib/agent`**: Browser automation logic and integrations.
- **`/src/lib/optimizer`**: Prompt optimization loop handling AI interactions and evaluation.
- **`/src/lib/db`**: Database connection and data layer logic.

## Branching Strategy

This repository follows a specific branch flow to ensure stability:
- `main`: Production code.
- `staging`: Integration branch for testing before production.
- `feature/*`: Active development branches.

**Workflow:**
1. Branch from `staging` into `feature/your-feature`.
2. PR from `feature/*` to `staging` (Requires passing CI checks).
3. PR from `staging` to `main` for production releases.

For more details, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Deployments (Vercel)

This repository is connected to Vercel for automated deployments:
- **Production (`main`)**: Commits to `main` auto-deploy to the primary production domain.
- **Staging (`staging`)**: Commits to `staging` auto-deploy to a dedicated staging environment (e.g. `staging.[domain]`).
- **Feature Branches**: Pushing to feature branches or opening PRs will generate unique Preview URLs.

## Getting Started Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
