import { Note } from "@/types/notes";

export default function NoteDetails({ note }: { note: Note | undefined }) {
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
