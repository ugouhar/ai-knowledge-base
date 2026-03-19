"use client";

import { Note } from "@/types/notes";
import { useCompletion } from "@ai-sdk/react";
import { useEffect } from "react";

function formatNotes(notes: Note[]) {
  return notes
    .map((note, index) => `Note ${index + 1}: ${note.title}\n${note.body}`)
    .join("\n\n");
}

function buildPrompt(notes: Note[], searchQuery: string) {
  const formattedNotes = formatNotes(notes);

  return `
    Notes:
    ${formattedNotes}

    Question: ${searchQuery}
  `;
}

export default function AIResponseStream({
  searchQuery,
  notes,
}: {
  searchQuery: string;
  notes: Note[];
}) {
  const { completion, complete, stop, isLoading } = useCompletion({
    api: "/api/stream",
  });

  useEffect(() => {
    if (searchQuery) {
      complete(buildPrompt(notes, searchQuery));
    }
    return () => stop();
  }, [searchQuery, notes, complete]);

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          AI Response
        </h2>
        {isLoading && (
          <button
            onClick={stop}
            className="ml-auto text-xs text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-300 rounded px-2 py-0.5 transition-colors duration-150"
          >
            Stop
          </button>
        )}
      </div>
      <div className="border rounded-lg p-4 mb-6 text-sm text-gray-800 leading-relaxed bg-gray-50 min-h-[80px] transition-all duration-150">
        {completion}
      </div>
    </div>
  );
}
