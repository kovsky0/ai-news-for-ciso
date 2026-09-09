// Pushes an issue to Buttondown. Default creates a DRAFT in Buttondown (review in dashboard);
// pass --send to email it to all subscribers immediately.
// Usage: node src/send.js issues/001-foo.md [--send]
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(readFileSync(join(root, "config.json"), "utf8"));

// load .env if present
const envFile = join(root, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^(\w+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const apiKey = process.env.BUTTONDOWN_API_KEY;
if (!apiKey) {
  console.error("BUTTONDOWN_API_KEY not set (put it in .env). Aborting.");
  process.exit(1);
}

const file = process.argv[2];
const reallySend = process.argv.includes("--send");
if (!file) {
  console.error("Usage: node src/send.js issues/<file>.md [--send]");
  process.exit(1);
}

const raw = readFileSync(join(root, file), "utf8");
const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
if (!m) throw new Error("Missing frontmatter");
const meta = {};
for (const line of m[1].split("\n")) {
  const kv = line.match(/^(\w+):\s*(.*)$/);
  if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
}

const webUrl = `${config.siteUrl}/issues/${meta.number}/`;
const body = `*[Read this issue on the web](${webUrl})*\n\n${m[2]}`;

const res = await fetch("https://api.buttondown.com/v1/emails", {
  method: "POST",
  headers: { Authorization: `Token ${apiKey}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    subject: `${config.siteName} #${meta.number}: ${meta.title}`,
    body,
    status: reallySend ? "about_to_send" : "draft",
  }),
});

if (!res.ok) {
  console.error(`Buttondown API error ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const data = await res.json();
console.log(
  reallySend
    ? `Sent issue #${meta.number} to subscribers. Email id: ${data.id}`
    : `Created Buttondown DRAFT for issue #${meta.number} (id: ${data.id}). Review at https://buttondown.com/emails — or rerun with --send.`
);
