# LearnifyNG AI Investigation Pipeline

**Status:** Implementation plan, not an existing integration. The current GitHub Pages prototype remains static.

## Goal for milestone 1

Implement:

**Question → Research plan → Source discovery → Claim extraction → Locality/date checks → Evidence ledger**

Do not start with an open-ended chatbot. Every generated claim should be connected to its source and remain reviewable.

## Minimal initial stack

- **OpenAI Responses API** for question parsing, structured research planning, claim extraction and evidence-grounded synthesis.
- **OpenAI web search tool** for current source discovery when the chosen Responses API configuration supports it.
- **Supabase/Postgres** for investigation records, source provenance, evidence items and review history.
- **Supabase Edge Function** as the trusted server-side boundary between the browser, OpenAI and the database.
- **Learnify's own deterministic rules and moderator workflow** for verification states and any future confidence calculation.

Gemini is not required for milestone 1. A second model may be evaluated later if it demonstrates a measurable improvement.

## Request flow

1. **Receive question.** Validate the text and identify the user's requested location and decision.
2. **Classify and scope.** Produce a structured topic, locality, time sensitivity, key entities, decision criteria and unresolved questions. Ask a short follow-up when an essential scope detail is missing.
3. **Create research plan.** List the specific claims to investigate and suitable source types. Keep the plan attached to the run for auditability.
4. **Discover sources.** Use web search to locate source candidates. Record the returned title, URL, publisher when available and retrieval time. Do not claim to have opened or verified a source unless the system actually did so.
5. **Extract claims.** For each candidate, retain the claim text, supporting excerpt, source URL, relevant page/document location, publication date if present and extraction status.
6. **Check locality and freshness.** Compare source geography and dates with the investigation scope. Missing locality/date stays unknown; do not infer a precise district from a country-level source.
7. **Detect duplicates and conflicts.** Flag likely copies, common-origin reports, incompatible dates and claims that disagree. These flags need review; they are not verification decisions.
8. **Save an evidence ledger.** Persist source and claim provenance with states such as pending or needs investigation. Keep unsupported claims out of the verified evidence set.
9. **Return a transparent result.** Show what was found, source links, relevant excerpts, dates, locality, disagreements and what remains unknown. If evidence is weak, return insufficient evidence rather than a confident-sounding answer.

## Suggested data fields

Store at least:
- **Investigation run:** original question, normalized question, requested locality, topic, research plan, status, model/provider, created/completed timestamps and error state.
- **Source record:** URL, title, publisher, source type, publication date, retrieved time, geographic scope, source excerpt/document locator and content hash where appropriate.
- **Claim/evidence record:** claim text, source reference, supporting excerpt, signal (supporting/conflicting/unknown), locality match, freshness result, duplicate group, origin and review state.
- **Review record:** reviewer, prior state, new state, timestamp and required decision note.

Align the physical schema with the existing Learnify Supabase schema before applying a migration; do not create duplicate tables solely because this document lists conceptual fields.

## Security and cost controls

- Never put an OpenAI API key or Supabase service-role key in browser JavaScript, static files or Git history.
- Store provider secrets in Supabase Edge Function secrets (or an equivalent server-side secret store).
- Require authentication and enforce database permissions for writing evidence and review state.
- Apply request limits, timeouts and bounded search/result counts. Do not run polling, scraping loops or unattended research jobs in the first milestone.
- Save enough provenance to audit the result without retaining unnecessary personal data.
- Handle provider errors and partial results explicitly; never silently convert an API failure into a successful investigation.
- Add deterministic tests for locality mismatches, unknown dates, duplicated reports, conflicts and source-less model claims.

## Acceptance criteria

Milestone 1 is not complete until:
- each extracted claim links to an actual source result and supporting excerpt;
- source URLs and retrieval timestamps are saved;
- evidence from outside the requested locality is flagged and excluded from local support unless explicitly relevant;
- missing or stale dates are shown as unknown/needs checking;
- duplicate and contradictory claims remain visible;
- AI output cannot set the verified state;
- no numerical confidence is presented as real before a deterministic calculation is implemented;
- keys stay server-side;
- tests cover normal, empty, error and conflicting-source results.

## Explicitly out of scope

No Gemini dependency, automatic verified state, automatic trust-score generation by the model, background polling, always-on scraping, community-report auto-promotion or arbitrary-question answer engine in this milestone.
