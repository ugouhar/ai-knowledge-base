import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CreateNoteForm from "@/components/CreateNoteForm";
import * as actions from "@/actions/notes";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/actions/notes");

beforeEach(() => vi.clearAllMocks());

describe("CreateNoteForm", () => {
  it("renders the title input, body textarea, and action buttons", () => {
    render(<CreateNoteForm />);
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write your note...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save Note" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("updates title and body inputs as the user types", async () => {
    const user = userEvent.setup();
    render(<CreateNoteForm />);

    const titleInput = screen.getByPlaceholderText("Title");
    const bodyInput = screen.getByPlaceholderText("Write your note...");

    await user.type(titleInput, "My Note");
    await user.type(bodyInput, "My body");

    expect(titleInput).toHaveValue("My Note");
    expect(bodyInput).toHaveValue("My body");
  });

  it("calls createNoteAction with form values and redirects to /notes on submit", async () => {
    const user = userEvent.setup();
    vi.mocked(actions.createNoteAction).mockResolvedValue(undefined);
    render(<CreateNoteForm />);

    await user.type(screen.getByPlaceholderText("Title"), "My Note");
    await user.type(screen.getByPlaceholderText("Write your note..."), "My body");
    await user.click(screen.getByRole("button", { name: "Save Note" }));

    expect(actions.createNoteAction).toHaveBeenCalledOnce();
    expect(actions.createNoteAction).toHaveBeenCalledWith({
      title: "My Note",
      body: "My body",
    });
    expect(mockPush).toHaveBeenCalledWith("/notes");
  });

  it("redirects to /notes when Cancel is clicked", async () => {
    const user = userEvent.setup();
    render(<CreateNoteForm />);
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(mockPush).toHaveBeenCalledWith("/notes");
    expect(actions.createNoteAction).not.toHaveBeenCalled();
  });
});
