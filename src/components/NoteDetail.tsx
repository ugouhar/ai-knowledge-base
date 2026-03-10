import { Note } from "@/types/notes";
import DeleteNote from "./DeleteNote";
import EditNoteButton from "./EditNoteButton";

export default function NoteDetail({ note }: { note: Note }) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <DeleteNote note={note} redirect />
        <EditNoteButton id={note.id} />
      </div>
      <p className="text-sm text-gray-400 mb-4">{note.created_at}</p>
      <p className="text-sm text-gray-700">{note.body}</p>
    </main>
  );
}
