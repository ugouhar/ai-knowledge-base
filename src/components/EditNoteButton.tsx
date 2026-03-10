import { Note } from "@/types/notes";
import Link from "next/link";

export default function EditNoteButton({ note }: { note: Note }) {
  return (
    <Link
      href={`/notes/${note.id}/edit`}
      className="text-sm text-gray-800 cursor-pointer"
    >
      Edit
    </Link>
  );
}
