ALTER TABLE public."ai-knowledge-base-table"
  ALTER COLUMN tags SET DEFAULT NULL;

UPDATE public."ai-knowledge-base-table"
  SET tags = NULL;