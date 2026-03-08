import NotesList from "@/components/NotesList";
import { mockNotes } from "@/mocks/mockNotes";

export default function NotesPage() {
  return (
    <main>
      <h1>My Notes</h1>
      <NotesList notes={mockNotes} />
    </main>
  );
}
