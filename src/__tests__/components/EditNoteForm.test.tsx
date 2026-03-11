import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import EditNoteForm from "@/components/EditNoteForm";
import * as actions from "@/actions/notes";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/actions/notes");

const NOTE = { id: 1, title: "Original Title", body: "Original body", created_at: "2024-01-01" };

beforeEach(() => vi.clearAllMocks());

describe("EditNoteForm", () => {
  it("pre-fills title and body from the note prop", () => {
    render(<EditNoteForm note={NOTE} />);
    expect(screen.getByPlaceholderText("Title")).toHaveValue("Original Title");
    expect(screen.getByPlaceholderText("Write your note...")).toHaveValue("Original body");
  });

  it("renders Update Note and Cancel buttons", () => {
    render(<EditNoteForm note={NOTE} />);
    expect(screen.getByRole("button", { name: "Update Note" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("updates inputs as the user types", async () => {
    const user = userEvent.setup();
    render(<EditNoteForm note={NOTE} />);

    const titleInput = screen.getByPlaceholderText("Title");
    await user.clear(titleInput);
    await user.type(titleInput, "New Title");

    expect(titleInput).toHaveValue("New Title");
  });

  it("calls updateNoteAction with note id and updated values, then redirects to /notes/[id]", async () => {
    const user = userEvent.setup();
    vi.mocked(actions.updateNoteAction).mockResolvedValue(undefined);
    render(<EditNoteForm note={NOTE} />);

    const titleInput = screen.getByPlaceholderText("Title");
    await user.clear(titleInput);
    await user.type(titleInput, "Updated Title");
    await user.click(screen.getByRole("button", { name: "Update Note" }));

    expect(actions.updateNoteAction).toHaveBeenCalledOnce();
    expect(actions.updateNoteAction).toHaveBeenCalledWith(1, {
      title: "Updated Title",
      body: "Original body",
    });
    expect(mockPush).toHaveBeenCalledWith("/notes/1");
  });

  it("redirects to /notes when Cancel is clicked", async () => {
    const user = userEvent.setup();
    render(<EditNoteForm note={NOTE} />);
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(mockPush).toHaveBeenCalledWith("/notes");
    expect(actions.updateNoteAction).not.toHaveBeenCalled();
  });
});
