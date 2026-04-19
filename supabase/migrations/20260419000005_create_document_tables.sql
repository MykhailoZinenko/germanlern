create table public.documents (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references public.profiles not null,
  title          text not null,
  type           text not null,
  content        jsonb,
  file_path      text,
  file_size_bytes int,
  page_count     int,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now(),
  last_opened_at timestamptz
);

create table public.document_images (
  id           uuid primary key default gen_random_uuid(),
  document_id  uuid references public.documents on delete cascade not null,
  user_id      uuid references public.profiles not null,
  storage_path text not null,
  mime_type    text not null,
  size_bytes   int,
  created_at   timestamptz default now()
);

create table public.annotations (
  id            uuid primary key default gen_random_uuid(),
  document_id   uuid references public.documents on delete cascade not null,
  user_id       uuid references public.profiles not null,
  type          text not null,
  page          int,
  start_offset  int,
  end_offset    int,
  selected_text text,
  note          text,
  color         text default '#ffe890',
  created_at    timestamptz default now()
);

create table public.document_word_events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.profiles not null,
  document_id uuid references public.documents on delete cascade not null,
  german_word text not null,
  action      text not null,
  created_at  timestamptz default now()
);
