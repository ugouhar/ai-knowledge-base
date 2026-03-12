"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DEBOUNCE_TIMEOUT = 500;
export default function SearchNote() {
  const router = useRouter();
  const initialSearchParams = useSearchParams();
  const initialSearchQuery = initialSearchParams.get("search") ?? "";
  const initialSemanticSearch =
    initialSearchParams.get("semanticSearch") === "true";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [semanticSearch, setSemanticSearch] = useState(initialSemanticSearch);

  useEffect(() => {
    const timer = setTimeout(() => {
      const searchParam = searchQuery.trim();
      const params = new URLSearchParams();
      if (searchParam) params.set("search", searchParam);
      if (semanticSearch) params.set("semanticSearch", "true");

      const queryString = params.toString();

      router.push(queryString ? `/notes?${queryString}` : "/notes");
    }, DEBOUNCE_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, semanticSearch, router]);

  const handleSetSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSemanticSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = e.target.checked;
    setSemanticSearch(isChecked);
  };

  return (
    <div className="mb-6">
      <div className="relative mb-2">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z"
          />
        </svg>
        <input
          value={searchQuery}
          placeholder="Search notes"
          onChange={handleSetSearchQuery}
          className="w-full border rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div className="flex items-center gap-2 px-1">
        <input
          type="checkbox"
          id="semantic-search"
          checked={semanticSearch}
          onChange={handleSemanticSearchChange}
          className="cursor-pointer accent-black"
        />
        <label
          htmlFor="semantic-search"
          className="text-xs text-gray-500 cursor-pointer select-none"
        >
          Semantic search
        </label>
      </div>
    </div>
  );
}
