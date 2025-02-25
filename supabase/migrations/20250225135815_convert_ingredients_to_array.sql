alter table "public"."recipes" alter column "instructions" set data type text[] using "instructions"::text[];


