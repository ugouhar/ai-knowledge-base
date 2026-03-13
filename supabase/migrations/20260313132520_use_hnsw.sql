DROP INDEX IF EXISTS "ai-knowledge-base-table_embedding_idx";

CREATE INDEX ON "ai-knowledge-base-table"
USING hnsw (embedding vector_cosine_ops);