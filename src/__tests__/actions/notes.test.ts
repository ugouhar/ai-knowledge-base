import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createNoteAction,
  deleteNoteAction,
  updateNoteAction,
} from "@/actions/notes";
import * as embeddings from "@/lib/ai/embeddings";
import * as repo from "@/lib/db/notes.repository";

vi.mock("@/lib/db/notes.repository");
vi.mock("@/lib/ai/embeddings", () => ({
  generateEmbedding: vi.fn().mockResolvedValue([0.1, 0.2, 0.3]),
}));

const NOTE = { id: 1, title: "Test", body: "Body", created_at: "2024-01-01", updated_at: "2024-01-01" };

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(embeddings.generateEmbedding).mockResolvedValue([0.1, 0.2, 0.3]);
});

describe("createNoteAction", () => {
  it("generates an embedding from title + body and creates the note with it", async () => {
    vi.mocked(repo.createNote).mockResolvedValue(NOTE);

    await createNoteAction({ title: "Test", body: "Body" });

    expect(embeddings.generateEmbedding).toHaveBeenCalledWith("Test Body");
    expect(repo.createNote).toHaveBeenCalledWith({ title: "Test", body: "Body", embedding: [0.1, 0.2, 0.3] });
  });

  it("propagates errors from generateEmbedding", async () => {
    vi.mocked(embeddings.generateEmbedding).mockRejectedValue(
      new Error("OpenAI error"),
    );
    await expect(createNoteAction({ title: "Test", body: "Body" })).rejects.toThrow(
      "OpenAI error",
    );
  });

  it("propagates errors from createNote", async () => {
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
  it("generates an embedding from title + body and updates the note with it", async () => {
    vi.mocked(repo.updateNote).mockResolvedValue(NOTE);

    await updateNoteAction(1, { title: "Updated", body: "Body" });

    expect(embeddings.generateEmbedding).toHaveBeenCalledWith("Updated Body");
    expect(repo.updateNote).toHaveBeenCalledWith(1, { title: "Updated", body: "Body", embedding: [0.1, 0.2, 0.3] });
  });

  it("propagates errors from generateEmbedding", async () => {
    vi.mocked(embeddings.generateEmbedding).mockRejectedValue(
      new Error("OpenAI error"),
    );
    await expect(
      updateNoteAction(1, { title: "Updated", body: "Body" }),
    ).rejects.toThrow("OpenAI error");
  });

  it("propagates errors from updateNote", async () => {
    vi.mocked(repo.updateNote).mockRejectedValue(new Error("Update failed"));
    await expect(
      updateNoteAction(1, { title: "Updated", body: "Body" }),
    ).rejects.toThrow("Update failed");
  });
});
