DROP FUNCTION IF EXISTS public.match_notes(vector, int, float);

CREATE FUNCTION public.match_notes(
  query_embedding vector(1536),
  match_count int DEFAULT 5,
  match_threshold float DEFAULT 0.3
)
RETURNS TABLE (id bigint, title text, body text, created_at timestamptz, updated_at timestamptz, similarity float)
LANGUAGE sql
STABLE
AS $function$
  select id, title, body, created_at, updated_at,
    1 - (embedding <=> query_embedding) as similarity
  from "ai-knowledge-base-table"
  where embedding is not null
    and 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding, id desc
  limit match_count;
$function$
;