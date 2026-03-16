// components/NoteList.tsx - Server Component, renders a list of notes
import { Note } from "@/types/notes";
import NoteCard from "./NoteCard";

type NotesListProps = {
  notesPromise: Promise<Note[]>;
};

export default async function NoteList({ notesPromise }: NotesListProps) {
  const notes = await notesPromise;

  if (notes.length === 0) {
    return <h1>No result found !!</h1>;
  }

  return (
    <ol className="list-none">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ol>
  );
}
