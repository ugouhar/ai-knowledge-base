// components/NotesList.tsx - Server Component, renders a list of notes
import { Note } from "@/types/notes";

type NotesListProps = {
  notes: Note[];
};

function NoteItem({ note }: { note: Note }) {
  return (
    <li className="border rounded-lg p-4 mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">{note.title}</span>
        <span className="text-sm text-gray-400">{note.createdAt}</span>
      </div>
      <p className="text-sm text-gray-600">{note.body}</p>
    </li>
  );
}

export default function NotesList({ notes }: NotesListProps) {
  return (
    <ol className="list-none">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ol>
  );
}
