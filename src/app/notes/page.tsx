// app/notes/page.tsx - Notes route, responsible for data fetching
import Loading from "@/components/Loading";
import NoteList from "@/components/NoteList";
import SearchNote from "@/components/SearchNote";
import Link from "next/link";
import { Suspense } from "react";

type NotesPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const searchQuery = (await searchParams).search;

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
      <Suspense key={searchQuery} fallback={<Loading />}>
        <NoteList searchQuery={searchQuery} />
      </Suspense>
    </main>
  );
}
