"use client";

import { Note } from "@/types/notes";
import { useRouter } from "next/navigation";

export default function EditNoteButton({ note }: { note: Note }) {
  const router = useRouter();

  const handleEditNote = async () => {
    router.push(`/notes/${note.id}/edit`);
  };

  return (
    <button
      onClick={handleEditNote}
      className="text-sm text-black-500 cursor-pointer"
    >
      Edit
    </button>
  );
}
