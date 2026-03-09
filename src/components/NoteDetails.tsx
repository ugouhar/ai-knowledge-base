import { mockNotes } from "@/mocks/mockNotes";
import { Note } from "@/types/notes";

export default function NoteDetails({ noteId }: { noteId: string }) {
  const note: Note | undefined = mockNotes.find((note) => note.id === noteId);

  if (!note) {
    return <h2>No note found</h2>;
  }

  return (
    <main>
      <h1>{note.title}</h1>
      <h2>{note.createdAt}</h2>
      <p>{note.body}</p>
    </main>
  );
}
