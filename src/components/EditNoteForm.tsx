// components/EditNoteForm.tsx - Client Component, handles editing note
"use client";

import { updateNoteAction } from "@/actions/notes";
import { Note } from "@/types/notes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Updating from "./indicators/Updating";

export default function EditNoteForm({ note }: { note: Note }) {
  const router = useRouter();

  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [isUpdating, setIsUpdating] = useState(false);
  const isNoteUpdated = title !== note.title || body !== note.body;
  const isUpdateButtonDisabled = !isNoteUpdated || isUpdating;

  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSetBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    const updatedNote: Pick<Note, "title" | "body"> = {
      title,
      body,
    };
    try {
      await updateNoteAction(note.id, updatedNote);
      router.push(`/notes/${note.id}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    router.push("/notes");
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Note</h1>
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
            disabled={isUpdateButtonDisabled}
          >
            Update Note
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="border text-sm px-4 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
      {isUpdating && <Updating />}
    </main>
  );
}
