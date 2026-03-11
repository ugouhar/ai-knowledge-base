// lib/db/notes.repository.ts - All database operations for notes
import { createClient } from "@/lib/supabase/server";
import { Note } from "@/types/notes";

const TABLE = "ai-knowledge-base-table";

export async function getAllNotes(): Promise<Note[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from(TABLE).select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function getMatchedNotes(query: string): Promise<Note[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .or(`title.ilike.%${query}%,body.ilike.%${query}%`);

  if (error) throw new Error(error.message);

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
  note: Pick<Note, "title" | "body">,
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
  updatedNote: Pick<Note, "title" | "body">,
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
