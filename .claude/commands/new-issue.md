---
description: Draft the next newsletter issue from a list of links
---

Draft the next issue of AI News for CISO from these links (and any pasted text): $ARGUMENTS

Steps:
1. Determine the next issue number and today's date. Read the two most recent files in `issues/` to match voice and avoid repeating stories.
2. Fetch EVERY link with WebFetch (spawn parallel subagents if there are many). For each: extract what actually happened, who it affects, and primary sources. If a link is thin or duplicative, say so and fold it into another item or drop it — tell the editor which links you dropped and why.
3. Rank stories by relevance to security leaders. Pick "The big one" deliberately — the story a CISO is most likely to be asked about this week.
3b. Sweep for optional sections per CLAUDE.md: in particular, check this week's AI-geopolitics coverage in the whitelisted outlets (Foreign Affairs, The Economist, FT, Lawfare, War on the Rocks, Carnegie, CSIS, Brookings, RAND) for "The long game". Include an optional section only if the material clears the same quality bar as the main stories — when in doubt, leave it out and tell the editor what you considered and rejected.
4. Write the issue following the editorial voice in CLAUDE.md (structure, "So what:" lines, length limits). Save as `issues/NNN-slug.md` with `status: draft`.
5. Run `npm run build -- --drafts` to verify it builds, then show the editor: the dropped links, the story ranking, and the full draft for review. If the editor wants a shareable preview, run `npm run deploy` and point them to https://ainewsforciso.com/preview/ (password = `PREVIEW_PASSWORD` in `.env`).

Do NOT send anything — `/send-issue` handles publishing after the editor approves.
