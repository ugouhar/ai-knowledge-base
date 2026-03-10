import EditNoteForm from "@/components/EditNoteForm";
import { getNoteById } from "@/lib/db/notes.repository";
import { notFound } from "next/navigation";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const noteId = parseInt((await params).noteId);
  const note = await getNoteById(noteId);

  if (!note) notFound();

  return <EditNoteForm note={note} />;
}
