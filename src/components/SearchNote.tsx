"use client";

import { SearchType } from "@/types/notes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DEBOUNCE_TIMEOUT = 500;
export default function SearchNote() {
  const router = useRouter();
  const initialSearchParams = useSearchParams();
  const initialSearchQuery = initialSearchParams.get("search") ?? "";
  const initialSearchType = initialSearchParams.get("searchType") ?? undefined;

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchType, setSearchType] = useState<SearchType | undefined>(
    initialSearchType as SearchType | undefined,
  );

  const buttonStyles = "cursor-pointer border rounded-lg pl-4 pr-4 py-1";

  useEffect(() => {
    const timer = setTimeout(() => {
      const searchQueryTrimmed = searchQuery.trim();
      const params = new URLSearchParams();
      if (searchQueryTrimmed) params.set("search", searchQueryTrimmed);
      if (searchType) params.set("searchType", searchType);

      const queryString = params.toString();

      router.push(queryString ? `/notes?${queryString}` : "/notes");
    }, DEBOUNCE_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchType, router]);

  const handleSetSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSearchTypeChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const searchTypeToSet = e.currentTarget.getAttribute("data-search-type");
    setSearchType((searchTypeToSet ?? undefined) as SearchType | undefined);
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
        <button
          onClick={handleSearchTypeChange}
          className={`${!searchType && "bg-blue-200"} ${buttonStyles}`}
        >
          Normal
        </button>
        <button
          data-search-type="semantic"
          onClick={handleSearchTypeChange}
          className={`${searchType === "semantic" && "bg-blue-200"} ${buttonStyles}`}
        >
          Semantic
        </button>
        <button
          data-search-type="askAI"
          onClick={handleSearchTypeChange}
          className={`${searchType === "askAI" && "bg-blue-200"} ${buttonStyles}`}
        >
          Ask AI
        </button>
      </div>
    </div>
  );
}
