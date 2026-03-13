CREATE OR REPLACE FUNCTION public.search_notes(search_query text)
 RETURNS SETOF public."ai-knowledge-base-table"
 LANGUAGE sql
 STABLE
AS $function$
  select * from "ai-knowledge-base-table"
  where title ilike '%' || search_query || '%'
     or body ilike '%' || search_query || '%'
  order by created_at desc;
$function$
;