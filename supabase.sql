-- Pégalo una vez en Supabase → SQL Editor → New query → Run.
-- Crea la tabla donde cada cuenta guarda su progreso de Ajedrez Pro y la regla de que
-- cada persona solo puede leer y escribir lo suyo. No toca la tabla «estados» de Organización Personal.

create table if not exists public.ajedrez_estados (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.ajedrez_estados enable row level security;

drop policy if exists "cada quien lo suyo" on public.ajedrez_estados;
create policy "cada quien lo suyo" on public.ajedrez_estados
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
