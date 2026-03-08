import { mockNotes } from "@/mocks/mockNotes";

type NoteProps = {
  note: {
    id: string;
    title: string;
    body: string;
    createdAt: string;
  };
};

const Note = ({ note }: NoteProps) => {
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

export const NotesPage = () => {
  return (
    <>
      <h1>My Notes</h1>
      <ol>
        {mockNotes.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </ol>
    </>
  );
};
