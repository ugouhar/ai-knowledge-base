"use server";

import { mockNotes } from "@/mocks/mockNotes";
import { Note } from "@/types/notes";

export async function createNote(note: Note) {
  mockNotes.push(note);
}
