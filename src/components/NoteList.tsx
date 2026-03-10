// components/NoteList.tsx - Server Component, renders a list of notes
import { Note } from "@/types/notes";
import NoteCard from "./NoteCard";

type NotesListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NotesListProps) {
  return (
    <ol className="list-none">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ol>
  );
}
