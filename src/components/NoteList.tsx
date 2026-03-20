"use client";
// components/NoteList.tsx - Client Component, renders a list of notes
import { Note } from "@/types/notes";
import NoteCard from "./NoteCard";
import { useState } from "react";

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes: initialNotes }: NoteListProps) {
  if (initialNotes.length === 0) {
    return <p className="text-sm text-gray-500">No results found.</p>;
  }

  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const handleDeleteNote = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <ol className="list-none">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
      ))}
    </ol>
  );
}
