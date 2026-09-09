# Growth plan — AI News for CISO

Method: Bell Curve / Julian Shapiro playbook. Fix positioning first, rank channels by ICE
(Impact × Confidence × Ease), run 2-week single-channel sprints with explicit kill/scale
thresholds, and optimize for **engaged subscribers** (opens/replies), not raw count. A
security-leader list of 300 that opens at 55% is worth more than 3,000 tourists.

North-star metric: **weekly engaged readers** (unique opens). Guardrails: open rate ≥ 45%,
spam complaints ~0, unsubscribe < 1%/issue.

---

## 0. Positioning (do before any acquisition)

Julian's rule: traffic sent to a mushy promise is wasted. The promise must be specific:

> "One five-minute email a week. What happened in AI security, and what it means for your
> program. Every story ends with a 'So what' you can repeat to your board."

- The **"So what:" line is the product**. All marketing should quote real "So what:" lines —
  they're proof, not description.
- Social proof placeholder until real: "Read by security leaders at …" goes on the landing
  page only when true. Until then, use issue quality as proof (link the archive).
- Personal brand carrier: this is *Daniel's* newsletter (practitioner voice), not a company
  property. CISOs subscribe to people, not brands.

## 1. Channel ranking (ICE, for THIS audience)

| # | Channel | Impact | Confidence | Ease | Notes |
|---|---------|--------|------------|------|-------|
| 1 | Warm network, 1:1 (LinkedIn DM / email / Slack) | High | High | High | First 50–100 subs. Highest conversion. Zero cost. |
| 2 | Daniel posting on LinkedIn (founder-brand content) | High | High | Med | 2–3 posts/week derived from each issue's "So what" lines. Compounding. |
| 3 | Newsletter cross-promos & mention swaps | High | Med | Med | tl;dr sec, Return on Security, Venture in Security, CISO Series, Detection at Scale, Resilient Cyber. Start with genuine "link to them" citations, then propose swaps. |
| 4 | Security communities | Med | Med | Med | CISO/security Slacks & Discords (e.g., MISC/Cyber Mentorship, Cloud Security Forum, OWASP chapters), ISSA/ISACA locals, r/cybersecurity where allowed. Share the *content*, not the signup link. |
| 5 | Cold-ish LinkedIn outreach (2nd degree, personalized) | Med | Med | Low | Works only value-first and low volume. See playbook below. |
| 6 | HN / Lobsters / infosec.exchange for a standout issue | Med | Low | High | Lottery ticket; costs nothing. Post the *issue*, never the landing page. |
| 7 | Podcast guesting / BSides & meetup talks | Med | Med | Low | Slow burn; start month 2–3. |
| 8 | Paid (LinkedIn/Twitter ads, newsletter sponsorships) | Low | Low | Low | CISO CPMs are brutal. Only after organic proves message-market fit. Test sponsorships in adjacent newsletters before ad platforms. |

Julian's discipline: **max two active channels at once**. Everything else stays on the bench
regardless of how tempting.

## 2. Sprint calendar (first 6 weeks)

**Sprint 1 (weeks 1–2): warm network + LinkedIn posting.**
- Send issue #1, then personally message 30–50 people who already know you: security folks
  from work history, conference contacts, ex-colleagues. Template (adapt per person, 3 lines max):
  > "I started writing a 5-minute weekly brief on AI security for security leaders — first
  > issue covers [the DseWiki agent story / whatever is current]. Thought of you because
  > [specific reason]. Here it is: [link to the ISSUE, not the landing page]. If it's useful,
  > subscribing is one click; if not, tell me why — that's just as useful."
- The ask-for-feedback close is deliberate: replies teach you positioning AND create the
  forward loop.
- Post on LinkedIn 3×/week: one story per post, lifted from the issue, ending with its
  "So what". Last line, not first: "From my weekly brief, AI News for CISO — link in comments."
- Target: 75–150 subscribers, ≥50% open rate. Kill nothing yet; this sprint always runs.

**Sprint 2 (weeks 3–4): cross-promos.**
- Every issue already cites sources; when citing another newsletter, tell the author. After
  two issues of genuine citations, propose a mention swap to the 3 closest-audience
  newsletters. Success: any swap that brings ≥30 subs with ≥40% open rate → make recurring.

**Sprint 3 (weeks 5–6): communities + targeted outreach (the LinkedIn question).**
- Communities: answer AI-security questions in 2–3 Slacks/forums with real substance, linking
  a specific issue section only when it directly answers the question.
- Cold-ish LinkedIn per the playbook below. Success threshold: ≥8% subscribe rate on
  accepted connections; below that, kill the channel and reinvest in posting.

## 3. Direct LinkedIn outreach — the honest playbook

Answer to "is it an option": yes, but the version that works looks nothing like outbound.

**Rules:**
1. **No automation. Ever.** No Sales-Nav scrapers, no sequencers, no mass connection bots.
   (a) LinkedIn bans for it; (b) this exact audience professionally detects and despises
   automated outreach — one screenshot of a templated DM in a CISO Slack kills the brand.
   All volume comes from Daniel's hands; Claude drafts, Daniel personalizes and sends.
2. **Target the 2nd degree, not strangers**: mutual connections, people who commented on the
   same posts, attendees of the same conferences, members of the same groups. Acceptance
   rates triple and it isn't spam.
3. **Aim one level below the title**: deputy CISOs, heads of secops/appsec, staff security
   engineers. They're less bombarded, they forward up, and they ARE the future CISOs.
4. **Value-first, no ask**: send the single most relevant story + "So what" for *their*
   industry, from an already-published issue. Subscribing is mentioned once, passively.
5. **Volume cap**: ≤10–15 new touches/day, ≤50 connection requests/week — below LinkedIn's
   radar and above nobody's annoyance threshold.
6. **Track it like a channel**: spreadsheet of touch → accept → reply → subscribe. If
   subscribe/accept < 8% after 100 touches, stop.

**What Claude does each week to feed this**: from the freshly sent issue, draft (a) 3 LinkedIn
posts, (b) 5 DM variants keyed to different industries (fintech, healthcare, SaaS, industrial,
public sector), (c) a short list of "who would care about THIS issue" angles. Daniel picks,
personalizes, sends.

## 4. Product-side growth (built into the newsletter)

- **Forward loop**: every issue ends with the forward ask (already does). Once >200 subs, add
  a real referral nudge: "forwarded this? get your own copy" header link.
- **Public archive as SEO surface**: each issue page targets "AI security news [week]" long
  tails; costs nothing, compounds.
- **Reply cultivation**: ask one question per issue ("what's your agent inventory answer?").
  Replies drive deliverability AND give content for next issue.
- **Deliverability hygiene**: keep open tracking honest, prune dead subscribers quarterly,
  custom sending domain once >500 subs (Buttondown paid tier) so reputation is owned.

## 5. Measurement (review every Tuesday after send)

| Metric | Target | Source |
|--------|--------|--------|
| New subscribers/week, by channel | growing | Buttondown + ask-in-DM tracking |
| Open rate | ≥45% | Buttondown |
| Link CTR | ≥10% | Buttondown |
| Replies per issue | ≥3 | inbox |
| LinkedIn: post impressions → profile visits → subs | subscribe rate trending up | LinkedIn analytics |
| Unsub + spam | <1% / ~0 | Buttondown |

Kill/scale rule (Julian's): a channel gets two sprints max to hit its threshold. Hitting it →
systematize (checklist in this file, Claude drafts the assets weekly). Missing it → bench it
and write down why.

## 6. What NOT to do (explicit bench)

- Paid ads before 500 organic subs and a stable ≥45% open rate.
- Twitter/X as a primary (security Twitter's CISO density has dropped; opportunistic only).
- Directory/aggregator submissions blast (low-quality subs poison open rates).
- Buying lists or auto-subscribing anyone. One spam-trap hit can end deliverability.
- LinkedIn automation tools (see above; worth repeating).
