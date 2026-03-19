// components/CreateNote.tsx - Client Component, handles note creation form
"use client";

import { createNoteAction } from "@/actions/notes";
import { Note } from "@/types/notes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNoteForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const isNoteEmpty = title === "" && body === "";

  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSetBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    const newNote: Pick<Note, "title" | "body"> = {
      title,
      body,
    };
    try {
      await createNoteAction(newNote);
      router.push("/notes");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    let confirmCancel = true;

    if (!isNoteEmpty) {
      confirmCancel = confirm("Do you want to discard the changes ?");
    }

    if (confirmCancel) {
      router.back();
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">New Note</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Title"
          value={title}
          onChange={handleSetTitle}
          required
          className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
        />
        <textarea
          placeholder="Write your note..."
          value={body}
          onChange={handleSetBody}
          required
          rows={6}
          className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black resize-none"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-75 disabled:shadow-none disabled:transform-none"
            disabled={isCreating}
          >
            {isCreating ? "Adding..." : "Add Note"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isCreating}
            className="border text-sm px-4 py-2 rounded-lg hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
