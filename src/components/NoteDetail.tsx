import { Note } from "@/types/notes";

export default function NoteDetail({ note }: { note: Note }) {
  return (
    <main>
      <h1>{note.title}</h1>
      <h2>{note.created_at}</h2>
      <p>{note.body}</p>
    </main>
  );
}
