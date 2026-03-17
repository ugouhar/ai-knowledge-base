import { Note } from "@/types/notes";
import NoteList from "./NoteList";

export default async function AIResponse({
  aiResponse,
}: {
  aiResponse: Promise<{ response: string; relevantNotes: Note[] }>;
}) {
  const { response, relevantNotes } = await aiResponse;

  return (
    <div className="mt-5">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
        AI Response
      </h2>
      <div className="border rounded-lg p-4 mb-6 text-sm text-gray-800 leading-relaxed bg-gray-50">
        {response}
      </div>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
        Relevant notes
      </h2>
      <NoteList notes={relevantNotes} />
    </div>
  );
}
