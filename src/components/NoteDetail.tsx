import { Note } from "@/types/notes";
import DeleteNote from "./DeleteNote";
import EditNoteButton from "./EditNoteButton";
import Link from "next/link";

export default function NoteDetail({ note }: { note: Note }) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/notes" className="text-sm text-gray-400 hover:text-gray-600">
        ← All notes
      </Link>
      <div className="flex justify-between items-start mt-6 mb-2">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <div className="flex items-center gap-2 text-sm">
          <EditNoteButton id={note.id} />
          <span className="text-gray-300">|</span>
          <DeleteNote note={note} redirect />
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-6">Created: {note.created_at}</p>
      <p className="text-sm text-gray-400 mb-6">
        Last updated: {note.updated_at}
      </p>
      <p className="text-sm text-gray-700 leading-relaxed">{note.body}</p>
    </main>
  );
}
