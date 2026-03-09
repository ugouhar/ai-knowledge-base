"use client";

import { mockNotes } from "@/mocks/mockNotes";
import { Note } from "@/types/notes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const getFormattedDate = (date: Date) =>
  date.toLocaleDateString("en-UK").split("/").reverse().join("-");

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSetBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdAt = getFormattedDate(new Date());

    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      body,
      createdAt,
    };
    mockNotes.push(newNote);
    router.push("/notes");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          placeholder="Add title"
          value={title}
          onChange={handleSetTitle}
        />
      </div>
      <div>
        <textarea
          placeholder="Add your notes"
          value={body}
          onChange={handleSetBody}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
