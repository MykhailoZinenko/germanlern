create table public.words (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references public.profiles not null,
  german_word           text not null,
  word_type             text,
  translation           text,
  alt_translations      jsonb,
  example_sentences     jsonb,
  gender                text,
  plural_form           text,
  conjugations          jsonb,
  conjugation_type      text,
  is_separable          boolean,
  takes_case            text,
  comparative           text,
  superlative           text,
  ai_tags               text[],
  verification_source   text default 'pending',
  verified_at           timestamptz,
  source                text default 'manual',
  source_ref_id         uuid,
  easiness_factor       numeric default 2.5,
  interval_days         int default 1,
  next_review_date      date,
  last_reviewed         timestamptz,
  review_count          int default 0,
  search_vector         tsvector,
  date_added            timestamptz default now(),
  updated_at            timestamptz default now()
);

create or replace function public.words_search_vector_update()
returns trigger as $$
begin
  new.search_vector :=
    to_tsvector('simple', coalesce(new.german_word, '')) ||
    to_tsvector('simple', coalesce(new.translation, '')) ||
    to_tsvector('simple', coalesce(array_to_string(new.ai_tags, ' '), ''));
  return new;
end;
$$ language plpgsql;

create trigger words_search_vector_trigger
  before insert or update on public.words
  for each row execute function public.words_search_vector_update();

create table public.user_tags (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.profiles not null,
  name       text not null,
  created_at timestamptz default now(),
  unique (user_id, name)
);

create table public.word_user_tags (
  word_id uuid references public.words on delete cascade not null,
  tag_id  uuid references public.user_tags on delete cascade not null,
  primary key (word_id, tag_id)
);

create table public.word_buffer (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.profiles not null,
  german_word     text not null,
  translation     text,
  notes           text,
  custom_sentence text,
  raw_user_tags   text[],
  created_at      timestamptz default now()
);
