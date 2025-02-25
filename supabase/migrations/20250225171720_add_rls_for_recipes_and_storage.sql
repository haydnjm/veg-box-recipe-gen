create policy "Anon INSERT"
on "public"."recipes"
as permissive
for insert
to anon
with check (true);


create policy "Anon SELECT"
on "public"."recipes"
as permissive
for select
to anon
using (true);


create policy "Anon UPDATE"
on "public"."recipes"
as permissive
for update
to anon
using (true)
with check (true);



