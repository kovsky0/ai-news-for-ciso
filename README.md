# AI News for CISO

Weekly AI briefing for security leaders. Live site: https://ainewsforciso.com (staging: https://kovsky0.github.io/ai-news-for-ciso/).

## Weekly routine

```
claude
> /new-issue https://link1 https://link2 https://link3 ...
# review the draft, ask for edits
> /send-issue
```

That's it — `/send-issue` deploys the site and emails subscribers via Buttondown.

## Manual commands

- `npm run build` — build the public site into `dist/` (`-- --drafts` to preview drafts inline; drafts are also always published encrypted at `/preview/`, unlocked with `PREVIEW_PASSWORD` from `.env`)
- `npm run serve` — build and preview locally
- `node src/send.js issues/<file>.md` — create a Buttondown draft (`--send` to deliver)

Setup details and editorial voice: see `CLAUDE.md`. Secrets: copy `.env.example` to `.env` and add the Buttondown API key.
