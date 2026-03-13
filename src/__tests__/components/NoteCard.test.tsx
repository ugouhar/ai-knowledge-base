import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NoteCard from "@/components/NoteCard";
import type { Note } from "@/types/notes";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/EditNoteButton", () => ({
  default: ({ id }: { id: number }) => (
    <a href={`/notes/${id}/edit`}>Edit</a>
  ),
}));

vi.mock("@/components/DeleteNote", () => ({
  default: ({ note }: { note: Note }) => (
    <button>Delete {note.title}</button>
  ),
}));

const NOTE: Note = {
  id: 3,
  title: "My Note",
  body: "Some body text",
  created_at: "2024-06-01",
  updated_at: "2024-06-02",
};

describe("NoteCard", () => {
  it("renders the note title as a link to /notes/[id]", () => {
    render(<NoteCard note={NOTE} />);
    const link = screen.getByRole("link", { name: "My Note" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/notes/3");
  });

  it("renders the note body", () => {
    render(<NoteCard note={NOTE} />);
    expect(screen.getByText("Some body text")).toBeInTheDocument();
  });

  it("renders the created_at date", () => {
    render(<NoteCard note={NOTE} />);
    expect(screen.getByText(/^Created /)).toBeInTheDocument();
  });

  it("renders Edit and Delete controls", () => {
    render(<NoteCard note={NOTE} />);
    expect(screen.getByRole("link", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete My Note" })).toBeInTheDocument();
  });
});
