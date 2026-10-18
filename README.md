# LearnifyNG — Local Decision Intelligence Prototype

LearnifyNG is a prototype for helping people investigate local questions, compare options, understand evidence quality and make better-informed decisions.

**This GitHub Pages version remains a prototype, with a first live-investigation code path now added on branch `feat/live-investigation-m1`.** The live path requires a configured Supabase project, Auth, database migration, deployed Edge Function, and server-side `OPENAI_API_KEY` before it can run. Without those settings, the UI explicitly reports that live research is not connected and does not present sample data as live findings.

## Product journey

**Ask → Find → Check → Understand → Compare → Decide**

The intended product should show users:
- what was found and where it came from;
- the location and date a claim applies to;
- what supports or conflicts with a claim;
- what remains unknown;
- how a recommendation follows from the evidence and the user's priorities.

## Trust rules

- An AI-generated statement is not verified evidence.
- A community report is a report, not proof by itself.
- Sources from another place or time must not silently support a local answer.
- Duplicates and copied reports must not be counted as independent corroboration.
- Conflicts and unknowns must remain visible.
- Any eventual confidence score must be reproducible from documented evidence rules.
- Sample data must never be presented as live research or a real recommendation.

See [the trust contract](docs/trust-contract.md) and [the AI investigation pipeline](docs/ai-investigation-pipeline.md).

## Current implementation

- Static HTML, CSS and vanilla JavaScript.
- Navigation, sample option cards, sample comparison, and sample priority selection.
- Browser-local storage for the current demo question, option and priorities.
- Live investigation frontend wiring and Supabase Edge Function source are present on the feature branch; deployment/configuration is still required\n- Evidence records are stored as `needs_investigation`; AI cannot mark sources verified\n- No production confidence engine, community voting/comments, or moderator verification UI yet.

## Proposed first production milestone

The first real investigation pipeline should turn a user question into a research plan, discover traceable sources, extract source-backed claims, check locality and dates, and save an evidence ledger. AI may assist with extraction and analysis, but must not mark evidence verified or decide the final confidence score.

For deployment, AI calls and provider keys must live in a server-side function, not in browser JavaScript. The current static prototype is not the production backend.

## GitHub Pages

The preview can be published from the repository root using GitHub Pages.


## Live investigation milestone (feature branch)

See [setup and smoke tests](docs/live-investigation-setup-and-tests.md). The implementation adds:
- An authenticated Supabase Edge Function calling the OpenAI Responses API with web search.
- Per-user investigation records and a source ledger with row-level security.
- Source links and clear empty/error states in the existing search flow.
- A public-only browser config template in `config.js`; provider secrets remain server-side.

**Not live until configured:** GitHub Pages does not deploy Supabase migrations or Edge Functions. Configure the Supabase project, apply the migration, deploy the function, set `OPENAI_API_KEY`, and replace the public URL/anon-key placeholders in `config.js`. Enable Supabase anonymous sign-ins or integrate an existing sign-in flow. Review the smoke-test checklist before relying on results.

Sources are research leads, not independently verified evidence. The current endpoint intentionally provides no numerical confidence score and does not support votes/comments.
