"use client";
// components/NoteList.tsx - Client Component, renders a list of notes
import { Note } from "@/types/notes";
import NoteCard from "./NoteCard";
import { useRef, useState } from "react";

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes: initialNotes }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const previousNotesRef = useRef<Note[]>([]);

  if (notes.length === 0) {
    return <p className="text-sm text-gray-500">No results found.</p>;
  }

  const handleDeleteNote = (id: number) => {
    previousNotesRef.current = [...notes];
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleRollBack = () => {
    setNotes([...previousNotesRef.current]);
  };

  return (
    <ol className="list-none">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={handleDeleteNote}
          onRollback={handleRollBack}
        />
      ))}
    </ol>
  );
}
