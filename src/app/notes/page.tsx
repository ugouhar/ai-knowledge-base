// app/notes/page.tsx - Notes route, responsible for data fetching
import NotesList from "@/components/NotesList";
import { mockNotes } from "@/mocks/mockNotes";

export default function NotesPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Notes</h1>
      <NotesList notes={mockNotes} />
    </main>
  );
}
