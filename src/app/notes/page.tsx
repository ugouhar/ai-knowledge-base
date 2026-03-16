// app/notes/page.tsx - Notes route, responsible for data fetching
import Loading from "@/components/Loading";
import NoteList from "@/components/NoteList";
import Searching from "@/components/Searching";
import SearchNote from "@/components/SearchNote";
import { generateEmbedding } from "@/lib/ai/embeddings";
import {
  getAllNotes,
  getMatchedNotes,
  getSemanticSearch,
} from "@/lib/db/notes.repository";
import { Note } from "@/types/notes";
import Link from "next/link";
import { Suspense } from "react";

type NotesPageProps = {
  searchParams: Promise<{ search?: string; semanticSearch?: string }>;
};

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const awaitedSearchParams = await searchParams;
  const searchQuery = awaitedSearchParams.search;
  const semanticSearch = awaitedSearchParams.semanticSearch === "true";

  let notes: Promise<Note[]>;

  if (!searchQuery) {
    notes = getAllNotes();
  } else if (semanticSearch) {
    const queryEmbedding = await generateEmbedding(searchQuery);
    notes = getSemanticSearch(queryEmbedding);
  } else {
    notes = getMatchedNotes(searchQuery);
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
      <Suspense
        fallback={<Searching />}
        key={`${searchQuery}-${semanticSearch}`}
      >
        <NoteList notes={notes} />
      </Suspense>
    </main>
  );
}
