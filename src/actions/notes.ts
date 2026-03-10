// actions/notes.ts - Server Actions for note mutations
"use server";

import { createNote, deleteNote } from "@/lib/db/notes.repository";
import { Note } from "@/types/notes";

export async function createNoteAction(note: Pick<Note, "title" | "body">) {
  await createNote(note);
}

export async function deleteNoteAction(id: number) {
  await deleteNote(id);
}
