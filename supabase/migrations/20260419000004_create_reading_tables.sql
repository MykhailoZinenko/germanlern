create table public.reading_texts (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references public.profiles not null,
  title          text not null,
  content        text not null,
  source         text not null,
  ai_prompt      text,
  word_count     int,
  created_at     timestamptz default now(),
  last_opened_at timestamptz
);

create table public.reading_word_events (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.profiles not null,
  reading_text_id uuid references public.reading_texts on delete cascade not null,
  german_word     text not null,
  action          text not null,
  created_at      timestamptz default now()
);
