---
description: Publish the latest draft issue — deploy to site and email subscribers
---

Publish the most recent draft issue (or the one specified): $ARGUMENTS

1. Find the latest `issues/*.md` with `status: draft`. Show its title and ask the editor to confirm publishing UNLESS they already explicitly confirmed in this conversation.
2. Flip `status: draft` → `status: sent` in the frontmatter. Set `date:` to today if it's stale.
3. Run `npm run build` to confirm the issue renders and is included.
4. Commit and push to `main` — this deploys the site with the new issue via GitHub Actions.
5. Email it: `node src/send.js issues/<file>.md --send`. If `BUTTONDOWN_API_KEY` is missing from `.env`, stop and tell the editor.
6. Report: live URL of the issue, Buttondown send confirmation, subscriber count if available (`GET https://api.buttondown.com/v1/subscribers` with the API key, count the results).
