ALTER TABLE public."ai-knowledge-base-table"
  ADD COLUMN updated_at timestamptz DEFAULT now();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public."ai-knowledge-base-table"
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();