// actions/notes.ts - Server Actions for note mutations
// This layer also orchestrates communication between ai layer and db layer
"use server";

import { generateEmbedding } from "@/lib/ai/embeddings";
import { generateTags } from "@/lib/ai/tags";
import {
  createNote,
  deleteNote,
  getNoteTags,
  updateNote,
  updateNoteTags,
} from "@/lib/db/notes.repository";
import { Note } from "@/types/notes";
import { revalidatePath, revalidateTag } from "next/cache";
import { after } from "next/server";

export async function createNoteAction(
  note: Pick<Note, "title" | "body">,
): Promise<number> {
  const embedding = await generateEmbedding(note.title + " " + note.body);
  const { id } = await createNote({ ...note, embedding });
  revalidateTag("notes", "max");
  after(() => createNoteTags(id, note).catch(console.error));
  return id;
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
  after(() => createNoteTags(id, updatedNote).catch(console.error));
}

async function createNoteTags(id: number, note: Pick<Note, "body" | "title">) {
  const tags = await generateTags(note.title + " " + note.body);
  await updateNoteTags(id, tags);
}

export async function fetchTags(id: number): Promise<string[] | null> {
  return getNoteTags(id);
}
