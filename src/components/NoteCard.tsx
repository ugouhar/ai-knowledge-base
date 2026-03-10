import { Note } from "@/types/notes";
import Link from "next/link";
import DeleteNote from "./DeleteNote";
import EditNoteButton from "./EditNoteButton";

export default function NoteCard({ note }: { note: Note }) {
  return (
    <li className="border rounded-lg p-4 mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">
          <Link href={`/notes/${note.id}`}>{note.title}</Link>
        </span>
        <span className="text-sm text-gray-400">{note.created_at}</span>
        <DeleteNote note={note} />
        <EditNoteButton note={note} />
      </div>
      <p className="text-sm text-gray-600">{note.body}</p>
    </li>
  );
}
