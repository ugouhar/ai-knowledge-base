// app/notes/page.tsx - Notes route, responsible for data fetching
import NoteList from "@/components/NoteList";
import { getAllNotes } from "@/lib/db/notes.repository";
import Link from "next/link";

export default async function NotesPage() {
  const notes = await getAllNotes();

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
      <NoteList notes={notes} />
    </main>
  );
}
