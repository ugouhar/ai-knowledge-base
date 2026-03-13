import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NoteDetail from "@/components/NoteDetail";
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
  id: 7,
  title: "Detail Note",
  body: "Full body content",
  created_at: "2024-03-15",
  updated_at: "2024-03-16",
};

describe("NoteDetail", () => {
  it("renders the note title", () => {
    render(<NoteDetail note={NOTE} />);
    expect(screen.getByRole("heading", { name: "Detail Note" })).toBeInTheDocument();
  });

  it("renders the note body", () => {
    render(<NoteDetail note={NOTE} />);
    expect(screen.getByText("Full body content")).toBeInTheDocument();
  });

  it("renders the created_at date", () => {
    render(<NoteDetail note={NOTE} />);
    expect(screen.getByText(/^Created:/)).toBeInTheDocument();
  });

  it("renders a back link to /notes", () => {
    render(<NoteDetail note={NOTE} />);
    const backLink = screen.getByRole("link", { name: /all notes/i });
    expect(backLink).toHaveAttribute("href", "/notes");
  });

  it("renders Edit and Delete controls", () => {
    render(<NoteDetail note={NOTE} />);
    expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute(
      "href",
      "/notes/7/edit",
    );
    expect(
      screen.getByRole("button", { name: "Delete Detail Note" }),
    ).toBeInTheDocument();
  });
});
