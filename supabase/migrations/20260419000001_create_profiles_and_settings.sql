create table public.profiles (
  id             uuid primary key references auth.users on delete cascade,
  email          text not null,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

create table public.settings (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references public.profiles unique not null,
  companion_name        text default 'Lumi',
  target_language       text default 'Indonesian',
  daily_goal            int default 10,
  onboarding_completed  boolean default false,
  tour_completed        boolean default false,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  insert into public.settings (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
