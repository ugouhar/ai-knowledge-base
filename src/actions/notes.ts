// actions/notes.ts - Server Actions for note mutations
// This layer also orchestrates communication between ai layer and db layer
"use server";

import { generateEmbedding } from "@/lib/ai/embeddings";
import { generateTags } from "@/lib/ai/tags";
import {
  createNote,
  deleteNote,
  updateNote,
  updateNoteTags,
} from "@/lib/db/notes.repository";
import { Note } from "@/types/notes";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createNoteAction(
  note: Pick<Note, "title" | "body">,
): Promise<void> {
  const embedding = await generateEmbedding(note.title + " " + note.body);
  const { id } = await createNote({ ...note, embedding });
  createNoteTags(id, note).catch(console.error);
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
  createNoteTags(id, updatedNote).catch(console.error);
  revalidateTag("notes", "max");
  revalidatePath("/notes/[noteId]", "page");
}

async function createNoteTags(id: number, note: Pick<Note, "body" | "title">) {
  const tags: string[] = await generateTags(note.title + " " + note.body);
  await updateNoteTags(id, tags);
}
