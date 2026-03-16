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

type NotesPageProps = {
  searchParams: Promise<{ search?: string; searchType?: SearchType }>;
};

async function fetchSemanticNotes(searchQuery: string): Promise<Note[]> {
  const queryEmbedding = await generateEmbedding(searchQuery);
  return getSemanticSearch(queryEmbedding);
}

async function fetchAskAI(searchQuery: string): Promise<Note[]> {
  return [];
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const params = await searchParams;
  const searchQuery = params.search;
  const searchType = params.searchType;

  let notesPromise: Promise<Note[]>;

  if (!searchQuery) {
    notesPromise = getAllNotes();
  } else if (searchType === "semantic") {
    notesPromise = fetchSemanticNotes(searchQuery);
  } else if (searchType === "askAI") {
    notesPromise = fetchAskAI(searchQuery);
  } else {
    notesPromise = getMatchedNotes(searchQuery);
  }

  const fallbackUI = searchQuery ? <Searching /> : <Loading />;

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
        <NoteList notesPromise={notesPromise} />
      </Suspense>
    </main>
  );
}
