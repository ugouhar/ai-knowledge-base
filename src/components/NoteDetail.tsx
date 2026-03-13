import { Note } from "@/types/notes";
import DeleteNote from "./DeleteNote";
import EditNoteButton from "./EditNoteButton";
import Link from "next/link";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NoteDetail({ note }: { note: Note }) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/notes"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors"
      >
        ← All notes
      </Link>

      <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex justify-between items-start gap-4 mb-1">
          <h1 className="text-2xl font-semibold text-gray-900 leading-snug">
            {note.title}
          </h1>
          <div className="flex items-center gap-1 shrink-0 mt-1">
            <EditNoteButton id={note.id} />
            <span className="text-gray-200 select-none">|</span>
            <DeleteNote note={note} redirect />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2 mb-7 text-xs text-gray-400">
          <span>Created {formatDate(note.created_at)}</span>
          {note.updated_at !== note.created_at && (
            <>
              <span className="text-gray-200">·</span>
              <span>Updated {formatDate(note.updated_at)}</span>
            </>
          )}
        </div>

        <hr className="border-gray-100 mb-7" />

        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {note.body}
        </p>
      </div>
    </main>
  );
}
