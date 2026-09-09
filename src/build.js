// Builds the static site into dist/: landing page, issue archive, RSS feed.
// Usage: node src/build.js [--drafts]   (--drafts includes draft issues, for local preview)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(readFileSync(join(root, "config.json"), "utf8"));
const includeDrafts = process.argv.includes("--drafts");
const dist = join(root, "dist");

// ---------- load issues ----------

function parseFrontmatter(raw, file) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  for (const key of ["number", "title", "date", "description", "status"]) {
    if (!meta[key]) throw new Error(`${file}: frontmatter missing "${key}"`);
  }
  return { meta, body: m[2] };
}

const issuesDir = join(root, "issues");
const issues = (existsSync(issuesDir) ? readdirSync(issuesDir) : [])
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const { meta, body } = parseFrontmatter(readFileSync(join(issuesDir, f), "utf8"), f);
    return {
      file: f,
      number: Number(meta.number),
      title: meta.title,
      date: meta.date,
      description: meta.description,
      draft: meta.status !== "sent",
      html: marked.parse(body),
    };
  })
  .filter((i) => includeDrafts || !i.draft)
  .sort((a, b) => b.number - a.number);

// ---------- shared page shell ----------

const css = `
:root {
  --bg: #0b0e14; --panel: #11151f; --border: #1e2534;
  --text: #d7dce6; --muted: #8b94a7; --accent: #4ade80; --accent-dim: #14532d;
  --serif: Georgia, 'Times New Roman', serif;
  --sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  --mono: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: var(--bg); color: var(--text); font-family: var(--sans); line-height: 1.65; }
.wrap { max-width: 720px; margin: 0 auto; padding: 0 24px; }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
header.site { padding: 28px 0; border-bottom: 1px solid var(--border); }
header.site .wrap { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; flex-wrap: wrap; }
.brand { font-family: var(--mono); font-size: 15px; color: var(--text); letter-spacing: 0.02em; }
.brand b { color: var(--accent); }
nav a { font-family: var(--mono); font-size: 13px; color: var(--muted); margin-left: 18px; }
.hero { padding: 72px 0 40px; }
.kicker { font-family: var(--mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: var(--accent); margin-bottom: 18px; }
h1.hero-title { font-family: var(--serif); font-size: clamp(34px, 6vw, 52px); line-height: 1.12; font-weight: 500; margin-bottom: 20px; }
.hero p.lede { font-size: 18px; color: var(--muted); max-width: 56ch; margin-bottom: 34px; }
.signup { display: flex; gap: 10px; flex-wrap: wrap; max-width: 480px; }
.signup input[type=email] {
  flex: 1 1 240px; padding: 13px 16px; font-size: 15px; border-radius: 8px;
  border: 1px solid var(--border); background: var(--panel); color: var(--text); outline: none;
}
.signup input[type=email]:focus { border-color: var(--accent); }
.signup button {
  padding: 13px 22px; font-size: 15px; font-weight: 600; border-radius: 8px; border: none;
  background: var(--accent); color: #06220f; cursor: pointer; font-family: var(--sans);
}
.signup button:hover { filter: brightness(1.1); }
.fine { font-size: 13px; color: var(--muted); margin-top: 12px; }
.points { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; padding: 34px 0 10px; }
.point { background: var(--panel); border: 1px solid var(--border); border-radius: 10px; padding: 18px; }
.point h3 { font-size: 14px; font-family: var(--mono); color: var(--accent); margin-bottom: 8px; font-weight: 500; }
.point p { font-size: 14px; color: var(--muted); }
section.archive { padding: 44px 0 60px; }
h2.section { font-family: var(--mono); font-size: 13px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--muted); margin-bottom: 20px; }
.issue-row { display: block; padding: 18px 0; border-bottom: 1px solid var(--border); color: var(--text); }
.issue-row:hover { text-decoration: none; background: var(--panel); margin: 0 -16px; padding: 18px 16px; border-radius: 8px; }
.issue-row .meta { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-bottom: 4px; }
.issue-row .t { font-family: var(--serif); font-size: 20px; }
.issue-row .d { font-size: 14px; color: var(--muted); margin-top: 4px; }
.empty { color: var(--muted); font-size: 15px; font-style: italic; }
.draft-badge { font-family: var(--mono); font-size: 11px; color: #fbbf24; border: 1px solid #fbbf2455; border-radius: 4px; padding: 1px 7px; margin-left: 8px; vertical-align: middle; }
footer.site { border-top: 1px solid var(--border); padding: 26px 0 44px; font-size: 13px; color: var(--muted); }
footer.site .wrap { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
article.issue { padding: 52px 0 30px; }
article.issue .meta { font-family: var(--mono); font-size: 13px; color: var(--muted); margin-bottom: 12px; }
article.issue h1 { font-family: var(--serif); font-size: clamp(30px, 5vw, 42px); line-height: 1.15; font-weight: 500; margin-bottom: 30px; }
.prose h2 { font-family: var(--serif); font-size: 26px; font-weight: 500; margin: 38px 0 14px; }
.prose h3 { font-size: 18px; margin: 28px 0 10px; }
.prose p, .prose ul, .prose ol { margin-bottom: 16px; color: var(--text); }
.prose ul, .prose ol { padding-left: 24px; }
.prose li { margin-bottom: 8px; }
.prose strong { color: #fff; }
.prose blockquote { border-left: 3px solid var(--accent); padding-left: 16px; color: var(--muted); margin-bottom: 16px; }
.prose hr { border: none; border-top: 1px solid var(--border); margin: 32px 0; }
.prose code { font-family: var(--mono); font-size: 0.9em; background: var(--panel); border: 1px solid var(--border); border-radius: 4px; padding: 1px 5px; }
.cta-box { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 26px; margin: 40px 0; }
.cta-box h3 { font-family: var(--serif); font-size: 20px; margin-bottom: 8px; font-weight: 500; }
.cta-box p { color: var(--muted); font-size: 14px; margin-bottom: 16px; }
`;

function page({ title, description, body, relRoot }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="alternate" type="application/rss+xml" title="${config.siteName}" href="${relRoot}rss.xml">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>">
<style>${css}</style>
</head>
<body>
<header class="site"><div class="wrap">
  <a class="brand" href="${relRoot}index.html">AI News <b>for CISO</b></a>
  <nav>
    <a href="${relRoot}index.html#archive">Archive</a>
    <a href="${relRoot}rss.xml">RSS</a>
    <a href="${relRoot}index.html#subscribe">Subscribe</a>
  </nav>
</div></header>
${body}
<footer class="site"><div class="wrap">
  <span>© ${new Date(Date.now()).getFullYear()} ${config.siteName}</span>
  <span>Curated by ${config.author} · Published weekly</span>
</div></footer>
</body>
</html>`;
}

const signupForm = (id) => `
<form class="signup" id="${id}" action="https://buttondown.com/api/emails/embed-subscribe/${config.buttondownUsername}" method="post" target="_blank">
  <input type="email" name="email" placeholder="you@company.com" required autocomplete="email">
  <button type="submit">Subscribe free</button>
</form>
<p class="fine">One email a week. No vendor pitches. Unsubscribe anytime.</p>`;

// ---------- landing page ----------

const archiveRows = issues.length
  ? issues
      .map(
        (i) => `<a class="issue-row" href="issues/${i.number}/index.html">
  <div class="meta">Issue #${i.number} · ${i.date}${i.draft ? '<span class="draft-badge">DRAFT</span>' : ""}</div>
  <div class="t">${i.title}</div>
  <div class="d">${i.description}</div>
</a>`
      )
      .join("\n")
  : `<p class="empty">Issue #1 is in the works — subscribe above to get it first.</p>`;

const landingBody = `
<div class="hero"><div class="wrap">
  <div class="kicker">Weekly · Free · For security leaders</div>
  <h1 class="hero-title">AI is moving faster than your security program. Keep up in one email.</h1>
  <p class="lede">${config.siteName} is a weekly briefing that cuts through AI hype for CISOs and security leaders: real incidents, emerging threats, governance moves, and the tools that matter — each with a "so what" for your program.</p>
  <div id="subscribe"></div>
  ${signupForm("subscribe-hero")}
</div></div>
<div class="wrap"><div class="points">
  <div class="point"><h3>// signal, not noise</h3><p>5–8 stories a week, hand-picked and summarized for a security leadership audience. Skimmable in five minutes.</p></div>
  <div class="point"><h3>// the "so what"</h3><p>Every story comes with what it means for your risk posture, your board conversation, or your roadmap.</p></div>
  <div class="point"><h3>// practitioner-run</h3><p>Curated by a security practitioner, not a content farm. No sponsors deciding what you read.</p></div>
</div></div>
<section class="archive"><div class="wrap">
  <h2 class="section" id="archive">Past issues</h2>
  ${archiveRows}
</div></section>`;

// ---------- write output ----------

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

writeFileSync(
  join(dist, "index.html"),
  page({
    title: `${config.siteName} — ${config.tagline}`,
    description: `${config.tagline}. Weekly, free, five-minute read on AI security for CISOs.`,
    body: landingBody,
    relRoot: "./",
  })
);

for (const issue of issues) {
  const dir = join(dist, "issues", String(issue.number));
  mkdirSync(dir, { recursive: true });
  const body = `
<article class="issue"><div class="wrap">
  <div class="meta">Issue #${issue.number} · ${issue.date}${issue.draft ? '<span class="draft-badge">DRAFT</span>' : ""}</div>
  <h1>${issue.title}</h1>
  <div class="prose">${issue.html}</div>
  <div class="cta-box">
    <h3>Get the next issue in your inbox</h3>
    <p>One weekly email on AI security for CISOs and security leaders. Free.</p>
    ${signupForm("subscribe-issue")}
  </div>
</div></article>`;
  writeFileSync(
    join(dir, "index.html"),
    page({ title: `${issue.title} — ${config.siteName}`, description: issue.description, body, relRoot: "../../" })
  );
}

const rssItems = issues
  .filter((i) => !i.draft)
  .map(
    (i) => `  <item>
    <title><![CDATA[${i.title}]]></title>
    <link>${config.siteUrl}/issues/${i.number}/</link>
    <guid>${config.siteUrl}/issues/${i.number}/</guid>
    <pubDate>${new Date(i.date + "T08:00:00Z").toUTCString()}</pubDate>
    <description><![CDATA[${i.description}]]></description>
  </item>`
  )
  .join("\n");

writeFileSync(
  join(dist, "rss.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${config.siteName}</title>
  <link>${config.siteUrl}</link>
  <description>${config.tagline}</description>
${rssItems}
</channel></rss>`
);

console.log(`Built ${issues.length} issue(s) into dist/ (${includeDrafts ? "including" : "excluding"} drafts)`);
