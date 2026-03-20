import { Note } from "@/types/notes";
import Link from "next/link";
import DeleteNote from "./DeleteNote";
import EditNoteButton from "./EditNoteButton";
import { getFormattedDate } from "@/utils/utils";

export default function NoteCard({
  note,
  onDelete,
  onRollback,
}: {
  note: Note;
  onDelete: (id: number) => void;
  onRollback: () => void;
}) {
  return (
    <li className="border rounded-lg p-4 mb-3 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <Link
          href={`/notes/${note.id}`}
          className="font-medium hover:underline underline-offset-2"
        >
          {note.title}
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-400 shrink-0 ml-4">
          <EditNoteButton id={note.id} />
          <span>|</span>
          <DeleteNote note={note} onDelete={onDelete} onRollback={onRollback} />
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-5">{note.body}</p>
      <div className="flex gap-2 text-xs text-gray-400">
        <span>Created {getFormattedDate(note.created_at)}</span>
        <span>|</span>
        <span>Updated {getFormattedDate(note.updated_at)}</span>
      </div>
    </li>
  );
}
