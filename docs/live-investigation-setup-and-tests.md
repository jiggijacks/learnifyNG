# Live investigation milestone: setup and smoke-test checklist

This repository is a static GitHub Pages preview. The live research path requires a Supabase project and secrets before it can run.

## Setup
1. Apply `supabase/migrations/202610180001_live_investigation_ledger.sql` to the intended Supabase project.
2. Deploy `supabase/functions/investigate/index.ts` as the `investigate` Edge Function.
3. Set the Edge Function secret `OPENAI_API_KEY`. Never put this key in GitHub Pages, HTML, or browser JavaScript.
4. Configure the app's Supabase URL and public anon key in a deployment-specific runtime config; never use a service-role key in the browser.
5. Enable Supabase Auth and require a signed-in user before invoking the function.

## Smoke tests
- Unauthenticated POST returns 401.
- Invalid JSON returns 400.
- Questions shorter than 3 or longer than 2,000 characters return 400.
- Missing provider configuration returns 503 without exposing secrets.
- A successful response includes an investigation ID, an answer, and HTTP(S) source links.
- No-citation results return `insufficient_evidence`, not a trust score.
- Provider failures return an explicit error and persist the failed run state.
- A user cannot read another user's investigations or source records.
- AI results are stored as `needs_investigation`; this endpoint never marks sources verified.
- Verify the browser UI renders answer text and source titles as text, not untrusted HTML.

## Not yet enabled
Community votes/comments, moderation tooling, deterministic confidence calculation, and automatic claim verification are intentionally out of scope.
