import NoteDetails from "@/components/NoteDetails";
import { mockNotes } from "@/mocks/mockNotes";
import { Note } from "@/types/notes";

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const noteId = (await params).noteId;
  const note: Note | undefined = mockNotes.find((note) => note.id === noteId);

  return <NoteDetails note={note} />;
}
