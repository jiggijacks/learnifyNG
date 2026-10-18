-- LearnifyNG live investigation ledger (Milestone 1)
create extension if not exists pgcrypto;

create table if not exists public.investigations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question text not null check (char_length(question) between 3 and 2000),
  status text not null default 'pending' check (status in ('pending','completed','insufficient_evidence','failed')),
  summary text,
  research_plan jsonb not null default '[]'::jsonb,
  provider text not null default 'openai',
  model text,
  error_code text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.investigation_sources (
  id uuid primary key default gen_random_uuid(),
  investigation_id uuid not null references public.investigations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  publisher text,
  excerpt text,
  published_at timestamptz,
  retrieved_at timestamptz not null default now(),
  locality text,
  status text not null default 'needs_investigation'
    check (status in ('needs_investigation','pending_review','verified','rejected')),
  created_at timestamptz not null default now(),
  unique (investigation_id, url)
);

create index if not exists investigations_user_created_idx
  on public.investigations (user_id, created_at desc);
create index if not exists investigation_sources_run_idx
  on public.investigation_sources (investigation_id);

alter table public.investigations enable row level security;
alter table public.investigation_sources enable row level security;

create policy "Users can read their investigations"
  on public.investigations for select to authenticated
  using (auth.uid() = user_id);
create policy "Users can create their investigations"
  on public.investigations for insert to authenticated
  with check (auth.uid() = user_id);
create policy "Users can update their investigations"
  on public.investigations for update to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can read sources for their investigations"
  on public.investigation_sources for select to authenticated
  using (auth.uid() = user_id);
create policy "Users can create sources for their investigations"
  on public.investigation_sources for insert to authenticated
  with check (
    auth.uid() = user_id and exists (
      select 1 from public.investigations i
      where i.id = investigation_id and i.user_id = auth.uid()
    )
  );

revoke all on public.investigations from anon;
revoke all on public.investigation_sources from anon;
grant select, insert, update on public.investigations to authenticated;
grant select, insert on public.investigation_sources to authenticated;
