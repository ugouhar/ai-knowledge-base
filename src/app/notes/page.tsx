// app/notes/page.tsx - Notes route, responsible for data fetching
import NotesList from "@/components/NotesList";
import { mockNotes } from "@/mocks/mockNotes";
import Link from "next/link";

export default function NotesPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Notes</h1>
      <Link href="/notes/create">Add new note</Link>
      <NotesList notes={mockNotes} />
    </main>
  );
}
