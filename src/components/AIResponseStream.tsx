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
  const { completion, complete } = useCompletion({
    api: "/api/stream",
  });

  useEffect(() => {
    if (searchQuery) {
      complete(buildPrompt(notes, searchQuery));
    }
  }, [searchQuery, complete]);

  return (
    <div className="mt-5">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
        AI Response
      </h2>
      {completion && (
        <div className="border rounded-lg p-4 mb-6 text-sm text-gray-800 leading-relaxed bg-gray-50">
          {completion}
        </div>
      )}
    </div>
  );
}
