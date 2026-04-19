insert into storage.buckets (id, name, public)
values ('user-files', 'user-files', false);

create policy "Users upload own files" on storage.objects for insert
  with check (bucket_id = 'user-files' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users view own files" on storage.objects for select
  using (bucket_id = 'user-files' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users delete own files" on storage.objects for delete
  using (bucket_id = 'user-files' and (storage.foldername(name))[1] = auth.uid()::text);
