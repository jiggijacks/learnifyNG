# LearnifyNG — Local Decision Intelligence Prototype

LearnifyNG helps people investigate local questions, compare options, understand evidence quality and make better-informed decisions.

**The current GitHub Pages app is still a prototype.** The repository contains a live-investigation code path, but it will work only after the intended Supabase project is configured, migrations are applied, the Edge Function is deployed, and server-side secrets are added. Until then, the UI must clearly say live research is not connected and must not present sample data as live findings.

## Product journey

**Ask → Find → Check → Understand → Compare → Decide**

Learnify should show users:
- what was found and where it came from;
- the location and date a claim applies to;
- what supports or conflicts with a claim;
- what remains unknown;
- how a recommendation follows from evidence and the user's priorities.

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

- Static HTML, CSS and vanilla JavaScript for the existing preview.
- Navigation, sample option cards, sample comparison, and sample priority selection.
- Browser-local storage for demo question, option and priorities.
- Live investigation frontend wiring that invokes a Supabase Edge Function.
- OpenAI Responses API web search in the server-side `investigate` Edge Function.
- Per-user investigation records and source provenance ledger with row-level security.
- Server-side-only writes after caller identity validation; browser clients are read-only for investigation records.
- AI-discovered sources remain `needs_investigation`. AI does not mark sources verified or calculate confidence scores.
- No community voting/comments, moderator verification UI, production confidence engine, or public-launch rate limiting yet.

## Deployment

GitHub Pages does not deploy Supabase migrations or Edge Functions. Follow the [setup and smoke-test checklist](docs/live-investigation-setup-and-tests.md).

The setup requires:
- applying both migrations in `supabase/migrations/` in timestamp order;
- deploying `supabase/functions/investigate/index.ts`;
- configuring the public Supabase URL and anon key in `config.js`;
- setting `OPENAI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` as Supabase Edge Function secrets;
- enabling Supabase Auth anonymous sign-ins or connecting an existing sign-in flow.

**Never put OpenAI or service-role keys in browser files or Git.** The public URL and anon key are browser configuration only and must be paired with correctly configured RLS.

Live research is not considered deployed until the setup and smoke tests pass. Sources are research leads, not independently verified evidence. Community feedback, moderation, and numerical confidence scoring remain out of scope for the first milestone.
