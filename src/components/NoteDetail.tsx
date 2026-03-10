import { Note } from "@/types/notes";
import DeleteNote from "./DeleteNote";

export default function NoteDetail({ note }: { note: Note }) {
  return (
    <main>
      <h1>{note.title}</h1>
      <h2>{note.created_at}</h2>
      <DeleteNote note={note} shouldReroute />
      <p>{note.body}</p>
    </main>
  );
}
