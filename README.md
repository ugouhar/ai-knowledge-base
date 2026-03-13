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

### 2. Install Supabase CLI and link your project

```bash
npx supabase login
npx supabase link --project-ref your-project-ref
```

> Your project ref is found in Supabase dashboard → Settings → General.

### 3. Push migrations to your cloud database

All schema changes (table, vector extension, indexes, functions) are already defined in `supabase/migrations/`. Push them all at once:

```bash
npx supabase db push
```

This sets up your database automatically — no need to run any SQL manually.

### 4. Seed the database (optional)

If you want to start with some sample notes, paste the contents of `supabase/seed.sql` into the **Supabase dashboard → SQL Editor** and run it.

> Notes are created without embeddings. Embeddings are generated automatically the first time each note is edited and saved through the app.

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
- Text search uses a Supabase RPC function (`search_notes`) to safely handle special characters like parentheses in queries

---

## Semantic Search — How it works

1. When a note is created or edited, its title and body are concatenated and sent to OpenAI's `text-embedding-3-small` model
2. The resulting 1536-dimension vector is stored in the `embedding` column
3. When a semantic search query is made, the query is embedded the same way
4. Supabase's `match_notes` function computes cosine similarity between the query vector and all stored embeddings and returns the closest matches above the threshold

> The similarity threshold is set to `0.3`. Raise it for stricter matching, lower it for broader results.
