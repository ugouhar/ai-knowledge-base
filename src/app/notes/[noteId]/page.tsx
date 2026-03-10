import NoteDetail from "@/components/NoteDetail";
import { getNoteById } from "@/lib/db/notes.repository";
import { notFound } from "next/navigation";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const noteId = (await params).noteId;
  const note = await getNoteById(parseInt(noteId));

  if (!note) notFound();

  return <NoteDetail note={note} />;
}
