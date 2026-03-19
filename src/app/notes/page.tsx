// app/notes/page.tsx - Notes route, responsible for data fetching

import SearchNote from "@/components/SearchNote";
import { generateEmbedding } from "@/lib/ai/embeddings";
import {
  getAllNotes,
  getMatchedNotes,
  getSemanticSearch,
} from "@/lib/db/notes.repository";
import { Note } from "@/types/notes";
import { SearchParam } from "@/types/pages";
import Link from "next/link";
import { Suspense } from "react";
import SearchResult from "@/components/SearchResult";
import StatusMessage from "@/components/indicators/StatusMessage";

async function fetchSemanticNotes(searchQuery: string): Promise<Note[]> {
  const queryEmbedding = await generateEmbedding(searchQuery);
  return getSemanticSearch(queryEmbedding);
}

export default async function NotesPage({ searchParams }: SearchParam) {
  const params = await searchParams;
  const searchQuery = params.search;
  const searchType = params.searchType;

  let notesPromise: Promise<Note[]> = Promise.resolve([]);

  if (!searchQuery) {
    notesPromise = getAllNotes();
  } else if (searchType === "semantic") {
    notesPromise = fetchSemanticNotes(searchQuery);
  } else if (searchType === "askAI") {
    notesPromise = fetchSemanticNotes(searchQuery);
  } else {
    notesPromise = getMatchedNotes(searchQuery);
  }

  let fallbackUI = null;

  if (searchType === "askAI") {
    fallbackUI = searchQuery ? (
      <StatusMessage message="AI is answering..." />
    ) : null;
  } else {
    fallbackUI = searchQuery ? (
      <StatusMessage message="Searching..." />
    ) : (
      <StatusMessage message="Loading..." />
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <Link
          href="/notes/create"
          className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + New Note
        </Link>
      </div>
      <SearchNote />
      <Suspense fallback={fallbackUI} key={`${searchQuery}-${searchType}`}>
        <SearchResult
          searchQuery={searchQuery}
          searchType={searchType}
          notesPromise={notesPromise}
        />
      </Suspense>
    </main>
  );
}
