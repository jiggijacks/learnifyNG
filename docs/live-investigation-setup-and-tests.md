# Live investigation milestone: setup and smoke-test checklist

LearnifyNG's public GitHub Pages app remains a static frontend. The live research path requires a configured Supabase project and server-side secrets. Source code in GitHub is not proof that the deployed service is configured.

## Setup

1. Apply migrations in order:
   - `supabase/migrations/202610180001_live_investigation_ledger.sql`
   - `supabase/migrations/202610190001_harden_investigation_writes.sql`
2. Deploy `supabase/functions/investigate/index.ts` as the `investigate` Edge Function.
3. Set these Edge Function secrets:
   - `OPENAI_API_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Configure the browser's public Supabase URL and anon key in `config.js` (or deployment-specific runtime config). Never put a service-role key or OpenAI key in browser files or Git.
5. Enable Supabase Auth anonymous sign-ins, or connect an existing authentication flow. The Edge Function validates the caller's bearer token before it performs any privileged write.
6. Confirm database RLS is enabled. Authenticated clients can read only their own investigations and source rows; writes are performed by the Edge Function after authentication.

## Smoke tests

- Unauthenticated POST returns 401.
- Invalid JSON returns 400.
- Questions shorter than 3 or longer than 2,000 characters return 400.
- Missing OpenAI or server-side Supabase configuration returns 503 without exposing secrets.
- A successful response includes an investigation ID, an answer, and HTTP(S) source links when the provider supplies citations.
- No-citation results return `insufficient_evidence`, not a trust score.
- Provider failures return an explicit error and persist the failed run state.
- A user cannot read another user's investigations or source records.
- Direct browser clients cannot insert or update investigations or sources, including setting a source's status to `verified`.
- AI-discovered sources are stored as `needs_investigation`; this endpoint never marks sources verified.
- Verify the browser UI renders answer text and source titles as text, not untrusted HTML.
- Confirm empty, timeout, provider-error, and partial-result states do not display sample results as live research.

## Not yet enabled

Community votes/comments, moderation tooling, deterministic confidence calculation, automated claim verification, and request-level rate limiting are not implemented by this milestone. Add rate limiting and abuse controls before broad public launch.
