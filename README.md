# AI Knowledge Base

A personal knowledge base app powered by semantic search. Write notes, then find them by meaning — not just keywords. Built with Next.js 15 App Router, Supabase, and OpenAI embeddings.

---

## What it does

- **Create, edit, delete notes** with a clean UI
- **Text search** — filters notes by keyword as you type
- **Semantic search** — finds notes by meaning using OpenAI embeddings and pgvector. Query _"how do I stop API keys leaking to the browser"_ and it finds your note on Environment Variables, even if those words never appear in the query
- Embeddings are generated and stored automatically on every create and edit — no manual step required

---

## Tech Stack

- **Framework:** Next.js 15 App Router (TypeScript)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL + pgvector)
- **AI:** OpenAI `text-embedding-3-small` via Vercel AI SDK

---

## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/ugouhar/ai-knowledge-base
cd ai-knowledge-base
npm install
```

### 2. Environment variables

Create a `.env.local` file in the **root of the project**:

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI — server only, never expose this to the client
OPENAI_API_KEY=your_openai_api_key
```

> **Where to find these:**
>
> - Supabase URL and anon key: Supabase dashboard → your project → Settings → API
> - OpenAI key: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

> ⚠️ `OPENAI_API_KEY` must **not** have the `NEXT_PUBLIC_` prefix — it should never be sent to the browser.

---

## Supabase Setup

### 1. Create a project

Go to [supabase.com](https://supabase.com), create a new project, and note your project URL and anon key.

### 2. Create the notes table

In the Supabase dashboard, open the **SQL Editor** and run:

```sql
create table public."ai-knowledge-base-table" (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  title text not null,
  body text not null
);
```

### 3. Enable pgvector and add the embedding column

```sql
create extension if not exists vector;

alter table public."ai-knowledge-base-table"
  add column embedding vector(1536);

create index on public."ai-knowledge-base-table"
  using ivfflat (embedding vector_cosine_ops);
```

### 4. Create the semantic search function

```sql
create or replace function match_notes (
  query_embedding vector(1536),
  match_count int default 5,
  match_threshold float default 0.3
)
returns table (id bigint, title text, body text, created_at timestamptz, similarity float)
language sql stable as $$
  select id, title, body, created_at,
    1 - (embedding <=> query_embedding) as similarity
  from "ai-knowledge-base-table"
  where embedding is not null
    and 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;
```

> The `match_threshold` of `0.3` filters out weakly related results. Raise it (e.g. `0.5`) for stricter matching, lower it for broader results.

---

## Running the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Architecture Notes

- All Supabase queries live in `src/lib/db/notes.repository.ts` — nothing else talks to the DB directly
- Pages are Server Components and fetch data directly; components only render what they receive as props
- Mutations go through Server Actions in `src/actions/notes.ts`
- `"use client"` is used only where interactivity is required
- Embeddings are generated server-side and never expose the OpenAI key to the client

---

## Semantic Search — How it works

1. When a note is created or edited, its title and body are concatenated and sent to OpenAI's `text-embedding-3-small` model
2. The resulting 1536-dimension vector is stored in the `embedding` column
3. When a semantic search query is made, the query is embedded the same way
4. Supabase's `match_notes` function computes cosine similarity between the query vector and all stored embeddings and returns the closest matches above the threshold
