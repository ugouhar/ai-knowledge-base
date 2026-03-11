import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DeleteNote from "@/components/DeleteNote";
import * as actions from "@/actions/notes";

const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
}));

vi.mock("@/actions/notes");

const NOTE = { id: 1, title: "Test Note", body: "Body", created_at: "2024-01-01" };

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(actions.deleteNoteAction).mockResolvedValue(undefined);
});

describe("DeleteNote", () => {
  it("renders a Delete button", () => {
    render(<DeleteNote note={NOTE} />);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("shows a confirmation dialog with the note title when clicked", async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);
    render(<DeleteNote note={NOTE} />);

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(confirmSpy).toHaveBeenCalledWith(
      "Do you want to delete the note: Test Note?",
    );
  });

  it("does not call deleteNoteAction when the user cancels the dialog", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(false);
    render(<DeleteNote note={NOTE} />);

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(actions.deleteNoteAction).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("calls deleteNoteAction and router.refresh() when confirmed (no redirect prop)", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<DeleteNote note={NOTE} />);

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(actions.deleteNoteAction).toHaveBeenCalledWith(1);
    expect(mockRefresh).toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("calls deleteNoteAction and router.push('/notes') when confirmed with redirect=true", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<DeleteNote note={NOTE} redirect />);

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(actions.deleteNoteAction).toHaveBeenCalledWith(1);
    expect(mockPush).toHaveBeenCalledWith("/notes");
    expect(mockRefresh).not.toHaveBeenCalled();
  });
});
