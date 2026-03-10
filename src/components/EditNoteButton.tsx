import Link from "next/link";

export default function EditNoteButton({ id }: { id: number }) {
  return (
    <Link
      href={`/notes/${id}/edit`}
      className="text-sm text-gray-800 hover:text-black cursor-pointer"
    >
      Edit
    </Link>
  );
}
