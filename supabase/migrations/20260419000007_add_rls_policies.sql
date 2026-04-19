alter table public.profiles enable row level security;
alter table public.settings enable row level security;
alter table public.words enable row level security;
alter table public.user_tags enable row level security;
alter table public.word_user_tags enable row level security;
alter table public.word_buffer enable row level security;
alter table public.study_sessions enable row level security;
alter table public.study_results enable row level security;
alter table public.streaks enable row level security;
alter table public.reading_texts enable row level security;
alter table public.reading_word_events enable row level security;
alter table public.documents enable row level security;
alter table public.document_images enable row level security;
alter table public.annotations enable row level security;
alter table public.document_word_events enable row level security;
alter table public.feature_events enable row level security;
alter table public.feedback enable row level security;

create policy "users access own data" on public.profiles for all using (id = auth.uid());
create policy "users access own data" on public.settings for all using (user_id = auth.uid());
create policy "users access own data" on public.words for all using (user_id = auth.uid());
create policy "users access own data" on public.user_tags for all using (user_id = auth.uid());
create policy "users access own data" on public.word_buffer for all using (user_id = auth.uid());
create policy "users access own data" on public.study_sessions for all using (user_id = auth.uid());
create policy "users access own data" on public.streaks for all using (user_id = auth.uid());
create policy "users access own data" on public.reading_texts for all using (user_id = auth.uid());
create policy "users access own data" on public.reading_word_events for all using (user_id = auth.uid());
create policy "users access own data" on public.documents for all using (user_id = auth.uid());
create policy "users access own data" on public.document_images for all using (user_id = auth.uid());
create policy "users access own data" on public.annotations for all using (user_id = auth.uid());
create policy "users access own data" on public.document_word_events for all using (user_id = auth.uid());
create policy "users access own data" on public.feature_events for all using (user_id = auth.uid());

create policy "users access own word tags" on public.word_user_tags for all
  using (exists (select 1 from public.words where words.id = word_user_tags.word_id and words.user_id = auth.uid()));

create policy "users access own results" on public.study_results for all
  using (exists (select 1 from public.study_sessions where study_sessions.id = study_results.session_id and study_sessions.user_id = auth.uid()));

create policy "authenticated users can submit feedback" on public.feedback for insert
  with check (auth.uid() is not null);
create policy "users view own feedback" on public.feedback for select
  using (user_id = auth.uid());
