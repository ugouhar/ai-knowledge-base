import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NoteList from "@/components/NoteList";
import type { Note } from "@/types/notes";

vi.mock("@/components/NoteCard", () => ({
  default: ({ note }: { note: Note }) => <li>{note.title}</li>,
}));

const NOTES: Note[] = [
  {
    id: 1,
    title: "Alpha",
    body: "Body A",
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  {
    id: 2,
    title: "Beta",
    body: "Body B",
    created_at: "2024-02-01",
    updated_at: "2024-02-01",
  },
];

describe("NoteList", () => {
  it("renders all notes passed as props", async () => {
    const jsx = await NoteList({ notes: NOTES });
    render(jsx);

    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("renders an empty list when no notes are passed", async () => {
    const jsx = await NoteList({ notes: [] });
    render(jsx);

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
