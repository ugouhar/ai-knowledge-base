// components/NoteList.tsx - Server Component, renders a list of notes
import { Note } from "@/types/notes";
import NoteCard from "./NoteCard";
import { getAllNotes, getMatchedNotes } from "@/lib/db/notes.repository";

type NotesListProps = {
  searchQuery?: string;
};

export default async function NoteList({ searchQuery }: NotesListProps) {
  const notes = await (searchQuery
    ? getMatchedNotes(searchQuery)
    : getAllNotes());

  return (
    <ol className="list-none">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ol>
  );
}
