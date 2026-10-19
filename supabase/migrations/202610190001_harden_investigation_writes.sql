-- Harden investigation writes: only the authenticated Edge Function (service-role server client)
-- may create/update investigations and source records. Browser clients remain read-only.
-- Existing source rows are retained; this migration does not mark any source verified.

drop policy if exists "Users can create their investigations" on public.investigations;
drop policy if exists "Users can update their investigations" on public.investigations;
drop policy if exists "Users can create sources for their investigations" on public.investigation_sources;

revoke insert, update, delete on public.investigations from authenticated;
revoke insert, update, delete on public.investigation_sources from authenticated;
grant select on public.investigations to authenticated;
grant select on public.investigation_sources to authenticated;

-- Defense in depth: source status is not a client-controlled verification switch.
-- Only server-side trusted code can write source rows after this migration.
comment on table public.investigations is
  'Investigation records. Client reads are owner-scoped by RLS; writes are performed by the authenticated server-side Edge Function.';
comment on table public.investigation_sources is
  'Source leads. AI-discovered sources must remain needs_investigation until a separate moderator review process approves them.';
