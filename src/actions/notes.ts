// actions/notes.ts - Server Actions for note mutations
"use server";

import { generateEmbedding } from "@/lib/ai/embeddings";
import {
  createNote,
  deleteNote,
  updateNote,
  updateNoteEmbedding,
} from "@/lib/db/notes.repository";
import { Note } from "@/types/notes";

async function embedNote(
  id: number,
  note: Pick<Note, "title" | "body">,
): Promise<void> {
  const concatenatedData = note.title + " " + note.body;
  const embedding = await generateEmbedding(concatenatedData);
  await updateNoteEmbedding(id, embedding);
}

export async function createNoteAction(
  note: Pick<Note, "title" | "body">,
): Promise<void> {
  const { id } = await createNote(note);
  await embedNote(id, note);
}

export async function deleteNoteAction(id: number): Promise<void> {
  await deleteNote(id);
}

export async function updateNoteAction(
  id: number,
  updatedNote: Pick<Note, "title" | "body">,
): Promise<void> {
  await updateNote(id, updatedNote);
  await embedNote(id, updatedNote);
}
