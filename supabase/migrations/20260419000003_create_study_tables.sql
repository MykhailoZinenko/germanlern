create table public.study_sessions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references public.profiles not null,
  mode             text not null,
  tag_filter       text[],
  companion_prompt text,
  words_reviewed   int default 0,
  correct_count    int default 0,
  started_at       timestamptz default now(),
  ended_at         timestamptz,
  completed        boolean default false
);

create table public.study_results (
  id             uuid primary key default gen_random_uuid(),
  session_id     uuid references public.study_sessions on delete cascade not null,
  word_id        uuid references public.words on delete cascade not null,
  exercise_type  text not null,
  quality_score  int not null,
  was_correct    boolean not null,
  created_at     timestamptz default now()
);

create table public.streaks (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid references public.profiles unique not null,
  current_streak     int default 0,
  longest_streak     int default 0,
  last_activity_date date,
  updated_at         timestamptz default now()
);
