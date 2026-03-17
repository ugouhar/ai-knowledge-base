// app/notes/page.tsx - Notes route, responsible for data fetching
import Loading from "@/components/indicators/Loading";
import NoteList from "@/components/NoteList";
import Searching from "@/components/indicators/Searching";
import SearchNote from "@/components/SearchNote";
import { generateEmbedding } from "@/lib/ai/embeddings";
import {
  getAllNotes,
  getMatchedNotes,
  getSemanticSearch,
} from "@/lib/db/notes.repository";
import { Note, SearchType } from "@/types/notes";
import Link from "next/link";
import { Suspense } from "react";
import { askQuestionWithContext } from "@/lib/ai/askAI";
import AIResponse from "@/components/AIResponse";
import StatusMessage from "@/components/indicators/StatusMessage";

type NotesPageProps = {
  searchParams: Promise<{ search?: string; searchType?: SearchType }>;
};

async function fetchSemanticNotes(searchQuery: string): Promise<Note[]> {
  const queryEmbedding = await generateEmbedding(searchQuery);
  return getSemanticSearch(queryEmbedding);
}

async function fetchAskAI(
  searchQuery: string,
): Promise<{ response: string; relevantNotes: Note[] }> {
  const relevantNotes = await fetchSemanticNotes(searchQuery);
  const response = await askQuestionWithContext(searchQuery, relevantNotes);

  return { response, relevantNotes };
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const params = await searchParams;
  const searchQuery = params.search;
  const searchType = params.searchType;

  let notesPromise: Promise<Note[]> = Promise.resolve([]);
  let aiResponse: Promise<{ response: string; relevantNotes: Note[] }> =
    Promise.resolve({ response: "", relevantNotes: [] });

  if (!searchQuery) {
    notesPromise = getAllNotes();
  } else if (searchType === "semantic") {
    notesPromise = fetchSemanticNotes(searchQuery);
  } else if (searchType === "askAI") {
    aiResponse = fetchAskAI(searchQuery);
  } else {
    notesPromise = getMatchedNotes(searchQuery);
  }

  const fallbackUI =
    searchType === "askAI" ? (
      <StatusMessage message="AI is answering..." />
    ) : searchQuery ? (
      <Searching />
    ) : (
      <Loading />
    );

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
        {searchType === "askAI" ? (
          <AIResponse aiResponse={aiResponse} />
        ) : (
          <NoteList notesPromise={notesPromise} />
        )}
      </Suspense>
    </main>
  );
}
