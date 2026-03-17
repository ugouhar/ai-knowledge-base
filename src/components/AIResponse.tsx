import { Note } from "@/types/notes";
import NoteList from "./NoteList";

export default async function AIResponse({
  aiResponse,
}: {
  aiResponse: Promise<{ response: string; relevantNotes: Note[] }>;
}) {
  const { response, relevantNotes } = await aiResponse;

  return (
    <div>
      <div className="border-2 border-black rounded-lg p-5 my-5">
        {response}
      </div>
      <h2>Relevant notes</h2>
      <NoteList notes={relevantNotes} />
    </div>
  );
}
