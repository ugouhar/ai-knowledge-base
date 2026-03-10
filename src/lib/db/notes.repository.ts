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

export async function getNoteById(id: number): Promise<Note | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;

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
