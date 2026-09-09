#!/usr/bin/env bash
# Builds the site and deploys it to GitHub Pages via the gh-pages branch.
# Used instead of the Actions workflow while the kovsky0 account has Actions
# locked by a billing issue; once that's fixed, pushes to main auto-deploy too.
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build
cd dist
touch .nojekyll
git init -qb gh-pages
git config user.name "Daniel Wyrzykowski"
git config user.email "kovsky0@users.noreply.github.com"
git add -A
git commit -qm "deploy"
git -c credential.helper= -c credential.helper='!gh auth git-credential' \
  push -f https://kovsky0@github.com/kovsky0/ai-news-for-ciso.git gh-pages
rm -rf .git

GH_TOKEN="$(gh auth token -u kovsky0)" gh api repos/kovsky0/ai-news-for-ciso/pages/builds -X POST >/dev/null
echo "Deployed: https://kovsky0.github.io/ai-news-for-ciso/"
