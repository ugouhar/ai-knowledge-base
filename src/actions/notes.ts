// actions/notes.ts - Server Actions for note mutations
"use server";

import { createNote } from "@/lib/db/notes.repository";
import { Note } from "@/types/notes";

export async function createNoteAction(note: Pick<Note, "title" | "body">) {
  await createNote(note);
}

// export async function deleteNote(id: string) {
//   const index = mockNotes.findIndex((n) => n.id === id);
//   if (index !== -1) mockNotes.splice(index, 1);
// }

// export async function updateNote(updatedNote: Note) {
//   const index = mockNotes.findIndex((n) => n.id === updatedNote.id);
//   if (index !== -1) mockNotes[index] = updatedNote;
// }
