import { Note } from "@/types/notes";
import NoteList from "./NoteList";

export default async function NoteListLoader({
  notesPromise,
}: {
  notesPromise: Promise<Note[]>;
}) {
  const notes = await notesPromise;
  return <NoteList notes={notes} />;
}
