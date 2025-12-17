---
description: Deploy changes to GitHub and trigger Vercel deployment
---

# Deploy E-Shark Platform

This workflow commits and pushes all changes to GitHub, which automatically triggers Vercel deployment.

## Steps:

// turbo-all

1. **Check current status**
```bash
git status
```

2. **Add all changes**
```bash
git add .
```

3. **Commit with descriptive message**
```bash
git commit -m "feat: Describe your changes here"
```

4. **Push to GitHub**
```bash
git push origin main
```

5. **Monitor deployment**
- Frontend: Check Vercel dashboard
- Backend: Check Render/Railway dashboard

## Commit Message Conventions:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - UI/styling changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## Examples:

```bash
# Adding new feature
git commit -m "feat: Add email notifications for investors"

# Fixing bug
git commit -m "fix: Resolve chat connection issue"

# Updating UI
git commit -m "style: Improve dashboard responsiveness"

# Documentation
git commit -m "docs: Update API endpoint documentation"
```

## Notes:

- Vercel deploys automatically within 1-2 minutes
- Check deployment status at vercel.com/dashboard
- Review build logs if deployment fails
- Frontend changes deploy to Vercel
- Backend changes deploy to Render/Railway (if configured)
