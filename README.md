# LearnifyNG — Local Decision Intelligence Prototype

LearnifyNG is a prototype for helping people investigate local questions, compare options, understand evidence quality and make better-informed decisions.

**This GitHub Pages version is a static interactive preview.** It uses illustrative sample data. It does not currently call an AI model, search the live web, connect to Supabase, independently verify claims or calculate real trust scores.

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
- No backend, AI API integration, source ingestion, live verification or production confidence engine.

## Proposed first production milestone

The first real investigation pipeline should turn a user question into a research plan, discover traceable sources, extract source-backed claims, check locality and dates, and save an evidence ledger. AI may assist with extraction and analysis, but must not mark evidence verified or decide the final confidence score.

For deployment, AI calls and provider keys must live in a server-side function, not in browser JavaScript. The current static prototype is not the production backend.

## GitHub Pages

The preview can be published from the repository root using GitHub Pages.
