"use client";

import { deleteNoteAction } from "@/actions/notes";
import { Note } from "@/types/notes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NoteCard({ note }: { note: Note }) {
  const router = useRouter();

  const handleDeleteNote = async () => {
    const shouldDeleteNote = window.confirm(
      `Do you want to delete the note: ${note.title}?`,
    );
    if (!shouldDeleteNote) return;

    await deleteNoteAction(note.id);
    router.refresh();
  };

  return (
    <li className="border rounded-lg p-4 mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">
          <Link href={`/notes/${note.id}`}>{note.title}</Link>
        </span>
        <span className="text-sm text-gray-400">{note.created_at}</span>
        <button onClick={handleDeleteNote}>Delete</button>
      </div>
      <p className="text-sm text-gray-600">{note.body}</p>
    </li>
  );
}
