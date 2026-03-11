import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NoteList from "@/components/NoteList";
import * as repo from "@/lib/db/notes.repository";
import type { Note } from "@/types/notes";

vi.mock("@/lib/db/notes.repository");

vi.mock("@/components/NoteCard", () => ({
  default: ({ note }: { note: Note }) => <li>{note.title}</li>,
}));

const NOTES: Note[] = [
  { id: 1, title: "Alpha", body: "Body A", created_at: "2024-01-01" },
  { id: 2, title: "Beta", body: "Body B", created_at: "2024-02-01" },
];

beforeEach(() => vi.clearAllMocks());

describe("NoteList", () => {
  it("fetches all notes when no searchQuery is provided", async () => {
    vi.mocked(repo.getAllNotes).mockResolvedValue(NOTES);

    // Async Server Components can be tested by calling them as async functions
    const jsx = await NoteList({ searchQuery: undefined });
    render(jsx);

    expect(repo.getAllNotes).toHaveBeenCalledOnce();
    expect(repo.getMatchedNotes).not.toHaveBeenCalled();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("fetches matched notes when a searchQuery is provided", async () => {
    vi.mocked(repo.getMatchedNotes).mockResolvedValue([NOTES[0]]);

    const jsx = await NoteList({ searchQuery: "alpha" });
    render(jsx);

    expect(repo.getMatchedNotes).toHaveBeenCalledWith("alpha");
    expect(repo.getAllNotes).not.toHaveBeenCalled();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.queryByText("Beta")).not.toBeInTheDocument();
  });

  it("renders an empty list when no notes match", async () => {
    vi.mocked(repo.getMatchedNotes).mockResolvedValue([]);

    const jsx = await NoteList({ searchQuery: "zzz" });
    render(jsx);

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
