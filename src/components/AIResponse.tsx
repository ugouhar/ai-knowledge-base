import { Note } from "@/types/notes";
import NoteList from "./NoteList";

export default async function AIResponse({
  aiResponse,
}: {
  aiResponse: Promise<{ response: string; relevantNotes: Note[] }>;
}) {
  const { response, relevantNotes } = await aiResponse;
  const notesPromise = Promise.resolve(relevantNotes);

  return (
    <div>
      <div
        style={{ border: "2px solid black", padding: "20px", margin: "20px" }}
      >
        {response}
      </div>
      <h2>Relevant notes</h2>
      <NoteList notesPromise={notesPromise} />
    </div>
  );
}
