// lib/db/notes.repository.ts - All database operations for notes
import { createClient } from "@/lib/supabase/server";
import { createCacheClient } from "@/lib/supabase/server-cache";
import { Note } from "@/types/notes";
import { unstable_cache } from "next/cache";

const TABLE = "ai-knowledge-base-table";

export const getAllNotes = unstable_cache(
  async (): Promise<Note[]> => {
    const supabase = createCacheClient();
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false }) // newest first
      .order("id", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },
  ["all-notes"],
  { tags: ["notes"] },
);

export async function getMatchedNotes(query: string): Promise<Note[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("search_notes", {
    search_query: query,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getSemanticSearch(embedding: number[]): Promise<Note[]> {
  // queries pgvector
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("match_notes", {
    query_embedding: embedding,
    match_count: 5,
  });
  if (error) {
    console.error("getSemanticSearch error:", error);
    return [];
  }
  return data;
}

export async function getNoteById(id: number): Promise<Note | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(error.message);
  }

  return data;
}

export async function createNote(
  note: Pick<Note, "title" | "body" | "embedding">,
): Promise<Note> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .insert(note)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteNote(id: number): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function updateNote(
  id: number,
  updatedNote: Pick<Note, "title" | "body" | "embedding">,
): Promise<Note> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .update(updatedNote)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateNoteTags(
  id: number,
  tags: string[],
): Promise<void> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .update({ tags: tags })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
}
