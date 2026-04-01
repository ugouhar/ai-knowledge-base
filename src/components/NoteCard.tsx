"use client";

import { Note } from "@/types/notes";
import Link from "next/link";
import DeleteNote from "./DeleteNote";
import EditNoteButton from "./EditNoteButton";
import { getFormattedDate } from "@/utils/utils";
import NoteTags from "./NoteTag";
import { useEffect, useState } from "react";
import { browserClient } from "@/lib/supabase/browser";
import { fetchTags } from "@/actions/notes";
import { isSubscribed, removeSubscriber } from "@/utils/tags-subscriber";
import { TABLE } from "@/lib/constants";

export default function NoteCard({
  note,
  onDelete,
  onRollback,
}: {
  note: Note;
  onDelete: (id: number) => void;
  onRollback: () => void;
}) {
  const [noteTags, setNoteTags] = useState<string[] | null>(note.tags);

  useEffect(() => {
    if (isSubscribed(note.id)) {
      const channel = browserClient.channel(`note-${note.id}`).on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: TABLE,
          filter: `id=eq.${note.id}`, // listen to a specific row
        },
        (payload) => {
          // payload.new contains the updated row
          setNoteTags((payload.new as Note).tags);
        },
      );

      channel.subscribe();

      fetchTags(note.id)
        .then((tags) => {
          if (tags) {
            setNoteTags(tags);
          }
        })
        .finally(() => {
          removeSubscriber(note.id);
        });

      return () => {
        channel.unsubscribe();
      };
    }
  }, []);

  return (
    <li className="border rounded-lg p-4 mb-3 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <Link
          href={`/notes/${note.id}`}
          className="font-medium hover:underline underline-offset-2"
        >
          {note.title}
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-400 shrink-0 ml-4">
          <EditNoteButton id={note.id} />
          <span>|</span>
          <DeleteNote note={note} onDelete={onDelete} onRollback={onRollback} />
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-5">{note.body}</p>
      <div className="flex gap-2 text-xs text-gray-400">
        <span>Created {getFormattedDate(note.created_at)}</span>
        <span>|</span>
        <span>Updated {getFormattedDate(note.updated_at)}</span>
      </div>
      <NoteTags tags={noteTags} />
    </li>
  );
}
