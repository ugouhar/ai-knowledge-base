import NoteDetails from "@/components/NoteDetails";
import { getNoteById } from "@/lib/db/notes.repository";
import { notFound } from "next/navigation";

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const noteId = (await params).noteId;
  const note = await getNoteById(parseInt(noteId));

  if (!note) notFound();

  return <NoteDetails note={note} />;
}
