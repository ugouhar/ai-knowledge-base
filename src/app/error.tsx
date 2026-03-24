"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <p className="text-4xl mb-4">⚠️</p>
      <h1 className="text-xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        An unexpected error occurred. Please try again.
      </p>
      <Link
        href="/"
        className="inline-block bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        Go home
      </Link>
    </div>
  );
}
