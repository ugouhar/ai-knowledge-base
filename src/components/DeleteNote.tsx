"use client";

import { deleteNoteAction } from "@/actions/notes";
import { Note } from "@/types/notes";
import { useRouter } from "next/navigation";

export default function DeleteNote({
  note,
  onDelete,
  onRollback,
  redirect = false,
}: {
  note: Note;
  onDelete?: (id: number) => void;
  onRollback?: () => void;
  redirect?: boolean;
}) {
  const router = useRouter();

  const handleDeleteNote = async () => {
    const shouldDeleteNote = window.confirm(
      `Do you want to delete the note: ${note.title}?`,
    );
    if (!shouldDeleteNote) return;

    try {
      onDelete?.(note.id);
      await deleteNoteAction(note.id);
      if (redirect) {
        router.push("/notes");
      }
    } catch {
      alert("Failed to delete note. Please try again");
      onRollback?.();
    }
  };

  return (
    <button
      onClick={handleDeleteNote}
      className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
    >
      Delete
    </button>
  );
}
