create table public.feature_events (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.profiles not null,
  event      text not null,
  metadata   jsonb,
  created_at timestamptz default now()
);

create table public.feedback (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references public.profiles,
  type          text not null,
  message       text not null,
  page_path     text,
  telegram_sent boolean default false,
  created_at    timestamptz default now()
);
