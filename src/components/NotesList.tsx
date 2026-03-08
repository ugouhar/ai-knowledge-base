import { Note } from "@/mocks/mockNotes";

type NotesListProps = {
  notes: Note[];
};

const NoteItem = ({ note }: { note: Note }) => {
  return (
    <li>
      <div>
        <span>{note.title}</span>
        <span>{note.createdAt}</span>
      </div>
      <div>{note.body}</div>
    </li>
  );
};

export default function NotesList({ notes }: NotesListProps) {
  return (
    <ol>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ol>
  );
}
