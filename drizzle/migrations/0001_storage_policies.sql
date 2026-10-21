create policy "admin upload site images" on storage.objects for insert to authenticated
  with check (bucket_id = 'site-images' and public.has_role(auth.uid(),'admin'));
create policy "admin read site images" on storage.objects for select to authenticated
  using (bucket_id = 'site-images' and public.has_role(auth.uid(),'admin'));
create policy "admin delete site images" on storage.objects for delete to authenticated
  using (bucket_id = 'site-images' and public.has_role(auth.uid(),'admin'));