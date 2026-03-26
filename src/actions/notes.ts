// actions/notes.ts - Server Actions for note mutations
"use server";

import { generateEmbedding } from "@/lib/ai/embeddings";
import { createNote, deleteNote, updateNote } from "@/lib/db/notes.repository";
import { Note } from "@/types/notes";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createNoteAction(
  note: Pick<Note, "title" | "body">,
): Promise<void> {
  const embedding = await generateEmbedding(note.title + " " + note.body);
  await createNote({ ...note, embedding });
  revalidateTag("notes", "max");
}

export async function deleteNoteAction(id: number): Promise<void> {
  await deleteNote(id);
  revalidateTag("notes", "max");
}

export async function updateNoteAction(
  id: number,
  updatedNote: Pick<Note, "title" | "body">,
): Promise<void> {
  const embedding = await generateEmbedding(
    updatedNote.title + " " + updatedNote.body,
  );
  await updateNote(id, { ...updatedNote, embedding });
  revalidateTag("notes", "max");
  revalidatePath("/notes/[noteId]", "page");
}
