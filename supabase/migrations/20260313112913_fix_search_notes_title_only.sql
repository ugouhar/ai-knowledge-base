create or replace function search_notes(search_query text)
returns setof "ai-knowledge-base-table"
language sql stable as $$
  select * from "ai-knowledge-base-table"
  where title ilike '%' || search_query || '%';
$$;