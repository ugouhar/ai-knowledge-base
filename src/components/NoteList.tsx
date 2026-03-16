// components/NoteList.tsx - Server Component, renders a list of notes
import { Note } from "@/types/notes";
import NoteCard from "./NoteCard";

type NotesListProps = {
  notes: Promise<Note[]>;
};

export default async function NoteList({ notes }: NotesListProps) {
  const allNotes = await notes;

  return (
    <ol className="list-none">
      {allNotes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ol>
  );
}
