# Contributing to Pilot

## Branching Strategy & Branch Protection Intent

To maintain stability and facilitate code reviews, we follow a strict branching model:

1. **`main`**: The production branch. No direct pushes are allowed here.
2. **`staging`**: The integration branch. All feature work is merged here first. No direct pushes are allowed here either.
3. **`feature/*`**: Development branches. All active development happens on these branches.

### Workflow

- Create a feature branch off `staging`: `git checkout -b feature/your-feature-name staging`
- Work on your feature and commit your changes.
- Open a Pull Request from `feature/your-feature-name` targeting the `staging` branch.
- Wait for CI checks (Linting, Type-checking, Build) to pass and for code review.
- Merge into `staging` (this will automatically deploy to the Preview environment on Vercel).
- To deploy to Production, open a PR from `staging` to `main`. Merging this PR will trigger the auto-deploy to the Production environment.
