"use client";

import { SearchType } from "@/types/notes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DEBOUNCE_TIMEOUT = 500;

const styles = {
  searchIcon: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4",
  input:
    "w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-150",
  buttonBase:
    "cursor-pointer border rounded-full px-4 py-1 text-sm font-medium transition-colors duration-150",
  buttonActive: "bg-blue-100 text-blue-700 border-blue-300",
  buttonInactive: "text-gray-500 border-gray-200 hover:bg-gray-100",
};

const buttonClass = (active: boolean) =>
  `${active ? styles.buttonActive : styles.buttonInactive} ${styles.buttonBase}`;

const PLACEHOLDERS: Record<string, string> = {
  semantic: "Find notes by concept or topic...",
  askAI: "Ask a question about your notes...",
};
const DEFAULT_PLACEHOLDER = "Search notes...";

export default function SearchNote() {
  const router = useRouter();
  const initialSearchParams = useSearchParams();
  const initialSearchQuery = initialSearchParams.get("search") ?? "";
  const initialSearchType = initialSearchParams.get("searchType") ?? undefined;

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchType, setSearchType] = useState<SearchType | undefined>(
    initialSearchType as SearchType | undefined,
  );

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
          className={styles.searchIcon}
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
          placeholder={searchType ? PLACEHOLDERS[searchType] : DEFAULT_PLACEHOLDER}
          onChange={handleSetSearchQuery}
          className={styles.input}
        />
      </div>
      <div className="flex items-center gap-1.5 px-1">
        <button onClick={handleSearchTypeChange} className={buttonClass(!searchType)}>
          Normal
        </button>
        <button
          data-search-type="semantic"
          onClick={handleSearchTypeChange}
          className={buttonClass(searchType === "semantic")}
        >
          Semantic
        </button>
        <button
          data-search-type="askAI"
          onClick={handleSearchTypeChange}
          className={buttonClass(searchType === "askAI")}
        >
          Ask AI
        </button>
      </div>
    </div>
  );
}
