// components/NoteList.tsx - Server Component, renders a list of notes
import { Note } from "@/types/notes";
import NoteCard from "./NoteCard";

type NoteListProps = {
  notes: Note[];
};

export default async function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return <p className="text-sm text-gray-500">No results found.</p>;
  }

  return (
    <ol className="list-none">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ol>
  );
}
