import { mockNotes, Note } from "@/mocks/mockNotes";

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

export default function NotesPage() {
  return (
    <>
      <h1>My Notes</h1>
      <ol>
        {mockNotes.map((note) => (
          <NoteItem note={note} key={note.id} />
        ))}
      </ol>
    </>
  );
}
