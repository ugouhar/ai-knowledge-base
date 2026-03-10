import { Note } from "@/types/notes";

export default function NoteDetails({ note }: { note: Note }) {
  return (
    <main>
      <h1>{note.title}</h1>
      <h2>{note.created_at}</h2>
      <p>{note.body}</p>
    </main>
  );
}
