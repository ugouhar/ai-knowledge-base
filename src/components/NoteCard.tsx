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
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{note.created_at}</span>
          <span>·</span>
          <EditNoteButton id={note.id} />
          <span>|</span>
          <DeleteNote note={note} />
        </div>
      </div>
      <p className="text-sm text-gray-600">{note.body}</p>
    </li>
  );
}
