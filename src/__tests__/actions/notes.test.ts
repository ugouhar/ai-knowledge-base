import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createNoteAction,
  deleteNoteAction,
  updateNoteAction,
} from "@/actions/notes";
import * as repo from "@/lib/db/notes.repository";

vi.mock("@/lib/db/notes.repository");

const NOTE = { id: 1, title: "Test", body: "Body", created_at: "2024-01-01" };

beforeEach(() => vi.clearAllMocks());

describe("createNoteAction", () => {
  it("delegates to createNote with the correct payload", async () => {
    vi.mocked(repo.createNote).mockResolvedValue(NOTE);
    await createNoteAction({ title: "Test", body: "Body" });
    expect(repo.createNote).toHaveBeenCalledOnce();
    expect(repo.createNote).toHaveBeenCalledWith({ title: "Test", body: "Body" });
  });

  it("propagates errors from the repository", async () => {
    vi.mocked(repo.createNote).mockRejectedValue(new Error("DB error"));
    await expect(createNoteAction({ title: "Test", body: "Body" })).rejects.toThrow(
      "DB error",
    );
  });
});

describe("deleteNoteAction", () => {
  it("delegates to deleteNote with the correct id", async () => {
    vi.mocked(repo.deleteNote).mockResolvedValue();
    await deleteNoteAction(1);
    expect(repo.deleteNote).toHaveBeenCalledOnce();
    expect(repo.deleteNote).toHaveBeenCalledWith(1);
  });

  it("propagates errors from the repository", async () => {
    vi.mocked(repo.deleteNote).mockRejectedValue(new Error("Delete failed"));
    await expect(deleteNoteAction(1)).rejects.toThrow("Delete failed");
  });
});

describe("updateNoteAction", () => {
  it("delegates to updateNote with the correct id and payload", async () => {
    vi.mocked(repo.updateNote).mockResolvedValue(NOTE);
    await updateNoteAction(1, { title: "Updated", body: "Body" });
    expect(repo.updateNote).toHaveBeenCalledOnce();
    expect(repo.updateNote).toHaveBeenCalledWith(1, {
      title: "Updated",
      body: "Body",
    });
  });

  it("propagates errors from the repository", async () => {
    vi.mocked(repo.updateNote).mockRejectedValue(new Error("Update failed"));
    await expect(
      updateNoteAction(1, { title: "Updated", body: "Body" }),
    ).rejects.toThrow("Update failed");
  });
});
