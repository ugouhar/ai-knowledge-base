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
      router.push(`/notes?search=${searchQuery}`);
    }, DEBOUNCE_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

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
