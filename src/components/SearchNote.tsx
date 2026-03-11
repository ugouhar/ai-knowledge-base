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
    <input
      value={searchQuery}
      placeholder="Search notes"
      onChange={handleSetSearchQuery}
    />
  );
}
