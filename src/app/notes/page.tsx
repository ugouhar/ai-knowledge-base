// app/notes/page.tsx - Notes route, responsible for data fetching
import NotesList from "@/components/NotesList";
import { mockNotes } from "@/mocks/mockNotes";
import Link from "next/link";

export default function NotesPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <Link
          href="/notes/create"
          className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + New Note
        </Link>
      </div>
      <NotesList notes={mockNotes} />
    </main>
  );
}
