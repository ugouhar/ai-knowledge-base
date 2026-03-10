import NoteDetails from "@/components/NoteDetails";
import { mockNotes } from "@/mocks/mockNotes";
import { Note } from "@/types/notes";
import { notFound } from "next/navigation";

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ noteId: number }>;
}) {
  const noteId = (await params).noteId;
  const note: Note | undefined = mockNotes.find((note) => note.id === noteId);
  if (!note) notFound();

  return <NoteDetails note={note} />;
}
