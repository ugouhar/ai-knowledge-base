"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DEBOUNCE_TIMEOUT = 300;
export default function SearchNote() {
  const router = useRouter();
  const initialSearchParams = useSearchParams();
  const initialSearchQuery = initialSearchParams.get("search") ?? "";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      const searchParam = encodeURIComponent(searchQuery.trim());
      if (searchParam === "") {
        router.push("/notes");
      } else {
        router.push(`/notes?search=${searchParam}`);
      }
    }, DEBOUNCE_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, router]);

  const handleSetSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  return (
    <div className="relative mb-4">
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
  );
}
