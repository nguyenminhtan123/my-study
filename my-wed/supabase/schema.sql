-- Thiệp cưới: database schema for Supabase. Run once in Supabase → SQL Editor → New query → Run.
-- Safe to re-run (uses "if not exists" / "or replace").
--
-- Access model
--   * Mini App (anon key): can only read ONE invitation by its code (get_invitation) and add an RSVP
--     (submit_rsvp). It cannot list invitations or read anyone's RSVPs.
--   * Admin web (logged in, listed in public.admins): full access to everything.

-- ---------- tables ----------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

create table if not exists public.invitations (
  code         text primary key check (code ~ '^[a-z0-9-]{6,64}$'),
  template_id  text not null,
  data         jsonb not null,               -- same shape as WeddingData in my-wed/src/core/types.ts
  status       text not null default 'draft'
               check (status in ('draft', 'active', 'memory', 'expired')),
  customer     text,                         -- who ordered (admin only), e.g. name + phone
  wedding_date date,
  expires_at   timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.rsvps (
  id              bigint generated always as identity primary key,
  invitation_code text not null references public.invitations (code) on delete cascade,
  guest_name      text not null check (char_length(guest_name) between 1 and 80),
  attending       boolean not null,
  party_size      smallint not null default 1 check (party_size between 1 and 20),
  side            text check (side in ('groom', 'bride')),
  message         text check (char_length(message) <= 1000),
  consent         boolean not null check (consent),
  created_at      timestamptz not null default now()
);
create index if not exists rsvps_invitation_idx on public.rsvps (invitation_code, created_at);

-- ---------- row level security ----------
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

alter table public.admins      enable row level security;
alter table public.invitations enable row level security;
alter table public.rsvps       enable row level security;

drop policy if exists admins_self on public.admins;
create policy admins_self on public.admins for select to authenticated using (user_id = auth.uid());

drop policy if exists invitations_admin on public.invitations;
create policy invitations_admin on public.invitations for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists rsvps_admin on public.rsvps;
create policy rsvps_admin on public.rsvps for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------- functions the Mini App calls ----------
-- One invitation by code; null when the code is unknown or the invitation has expired.
create or replace function public.get_invitation(p_code text) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object('template_id', template_id, 'data', data, 'status', status)
  from public.invitations
  where code = lower(p_code)
    and status <> 'expired'
    and (expires_at is null or expires_at > now());
$$;

-- Guest's RSVP + wish. Only accepted for live invitations. Wishes are never readable from the app.
create or replace function public.submit_rsvp(
  p_code text, p_guest_name text, p_attending boolean, p_party_size int,
  p_side text, p_message text, p_consent boolean
) returns boolean
language plpgsql security definer set search_path = public as $$
begin
  if not exists (
    select 1 from public.invitations
    where code = lower(p_code) and status in ('draft', 'active')
      and (expires_at is null or expires_at > now())
  ) then
    return false;
  end if;
  insert into public.rsvps (invitation_code, guest_name, attending, party_size, side, message, consent)
  values (lower(p_code), trim(p_guest_name), p_attending, greatest(1, least(coalesce(p_party_size, 1), 20)),
          nullif(p_side, ''), nullif(trim(p_message), ''), p_consent);
  return true;
end;
$$;

revoke all on function public.get_invitation(text) from public;
revoke all on function public.submit_rsvp(text, text, boolean, int, text, text, boolean) from public;
grant execute on function public.get_invitation(text) to anon, authenticated;
grant execute on function public.submit_rsvp(text, text, boolean, int, text, text, boolean) to anon, authenticated;

-- ---------- storage: photos and songs for invitations ----------
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists media_admin_write on storage.objects;
create policy media_admin_write on storage.objects for all to authenticated
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

-- ---------- after creating your admin login (Authentication → Users → Add user) ----------
-- insert into public.admins (user_id) select id from auth.users where email = 'YOUR_EMAIL';
