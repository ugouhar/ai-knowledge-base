import { Note, SearchType } from "@/types/notes";
import NoteList from "./NoteList";
import AIResponseStream from "./AIResponseStream";

export default async function SearchResult({
  searchQuery,
  searchType,
  notesPromise,
}: {
  searchQuery?: string;
  searchType?: SearchType;
  notesPromise: Promise<Note[]>;
}) {
  if (searchType === "askAI") {
    if (searchQuery) {
      const notes = await notesPromise;
      return (
        <>
          <AIResponseStream searchQuery={searchQuery} notes={notes} />
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Relevant Notes
          </h2>
          <NoteList notes={notes} />
        </>
      );
    } else {
      return <></>;
    }
  } else {
    const notes = await notesPromise;
    return <NoteList notes={notes} />;
  }
}
