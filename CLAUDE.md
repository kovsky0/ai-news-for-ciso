# AI News for CISO

Weekly newsletter for CISOs and security leaders about AI: incidents, threats, governance, and tooling. This repo contains the landing page/archive site, the issues themselves, and the editorial pipeline.

## How everything works

- `issues/*.md` — one file per issue, markdown with frontmatter. This is the source of truth.
- `src/build.js` — renders `dist/` (landing page, issue pages, RSS) from the issues. `npm run build` (add `-- --drafts` to include drafts for preview).
- `src/send.js` — pushes an issue to Buttondown (subscriber list + email delivery). Draft by default, `--send` to deliver. Needs `BUTTONDOWN_API_KEY` in `.env`.
- `.github/workflows/deploy.yml` — builds and deploys the site to GitHub Pages on every push to `main`. Drafts are never published to the live site.
- `config.json` — site name, URL, Buttondown username.

## Weekly workflow (the whole point of this repo)

The editor (Daniel) opens Claude Code and runs `/new-issue` with a pile of links, or just pastes links. Claude then does the work — see `.claude/commands/new-issue.md`. Publishing = `/send-issue`, which flips the issue to `sent`, pushes (deploys the site), and delivers via Buttondown.

## Issue format

```
---
number: 3
title: Punchy, specific title — not clickbait
date: 2026-09-15
description: One sentence used in the archive list, RSS, and meta description.
status: draft
---
```

`status` is `draft` until the issue has been emailed, then `sent`. Filename: `NNN-short-slug.md` (e.g. `003-shadow-mcp.md`).

## Editorial voice

Audience: CISOs, deputy CISOs, security engineering leaders. Assume strong security knowledge, moderate AI knowledge, very little time.

- **Structure**: open with a 2–3 sentence editor's note, then "The big one" (top story, ~150 words), then "Worth your time" (4–6 stories, ~60 words each), optionally "Tooling corner" (1–2 items). Close with a one-line sign-off.
- **Every story ends with a "So what:" line** — the concrete implication for a security program (risk posture, board conversation, policy, roadmap). This is the product; never skip it.
- Link the original source in the story heading or first sentence. Never link paywalled summaries when the primary source is available.
- Tone: direct, dry, practitioner-to-practitioner. No hype words ("game-changing", "revolutionary"), no fear-mongering, no emoji.
- Be precise about what actually happened vs. vendor claims vs. speculation — label each.
- ~900–1300 words total. It must be readable in five minutes.
