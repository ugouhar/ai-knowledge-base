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
