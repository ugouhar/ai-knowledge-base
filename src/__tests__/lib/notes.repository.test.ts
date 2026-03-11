import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getMatchedNotes,
  getNoteById,
  updateNote,
} from "@/lib/db/notes.repository";
import { createClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server");

const NOTE = { id: 1, title: "Test", body: "Body", created_at: "2024-01-01" };

/** Builds a Proxy that is both chainable and awaitable with the given result. */
function buildChain(result: { data?: unknown; error?: unknown }) {
  const promise = Promise.resolve(result);
  const chain: Record<string, unknown> = new Proxy(
    {},
    {
      get(_, prop: string) {
        if (prop === "then") return promise.then.bind(promise);
        if (prop === "catch") return promise.catch.bind(promise);
        if (prop === "finally") return promise.finally.bind(promise);
        return vi.fn().mockReturnValue(chain);
      },
    },
  );
  return chain;
}

function mockClient(result: { data?: unknown; error?: unknown }) {
  const chain = buildChain(result);
  const client = { from: vi.fn().mockReturnValue(chain) };
  vi.mocked(createClient).mockResolvedValue(client as never);
  return client;
}

beforeEach(() => vi.clearAllMocks());

// ---------------------------------------------------------------------------
// getAllNotes
// ---------------------------------------------------------------------------
describe("getAllNotes", () => {
  it("returns all notes on success", async () => {
    mockClient({ data: [NOTE], error: null });
    const result = await getAllNotes();
    expect(result).toEqual([NOTE]);
  });

  it("throws when Supabase returns an error", async () => {
    mockClient({ data: null, error: { message: "DB error" } });
    await expect(getAllNotes()).rejects.toThrow("DB error");
  });
});

// ---------------------------------------------------------------------------
// getMatchedNotes
// ---------------------------------------------------------------------------
describe("getMatchedNotes", () => {
  it("returns matched notes on success", async () => {
    mockClient({ data: [NOTE], error: null });
    const result = await getMatchedNotes("test");
    expect(result).toEqual([NOTE]);
  });

  it("throws when Supabase returns an error", async () => {
    mockClient({ data: null, error: { message: "Search failed" } });
    await expect(getMatchedNotes("test")).rejects.toThrow("Search failed");
  });
});

// ---------------------------------------------------------------------------
// getNoteById
// ---------------------------------------------------------------------------
describe("getNoteById", () => {
  it("returns the note when found", async () => {
    mockClient({ data: NOTE, error: null });
    const result = await getNoteById(1);
    expect(result).toEqual(NOTE);
  });

  it("returns null when PGRST116 (row not found)", async () => {
    mockClient({ data: null, error: { code: "PGRST116", message: "Not found" } });
    const result = await getNoteById(999);
    expect(result).toBeNull();
  });

  it("throws for any other Supabase error", async () => {
    mockClient({ data: null, error: { code: "500", message: "Server error" } });
    await expect(getNoteById(1)).rejects.toThrow("Server error");
  });
});

// ---------------------------------------------------------------------------
// createNote
// ---------------------------------------------------------------------------
describe("createNote", () => {
  it("returns the created note on success", async () => {
    mockClient({ data: NOTE, error: null });
    const result = await createNote({ title: "Test", body: "Body" });
    expect(result).toEqual(NOTE);
  });

  it("throws when Supabase returns an error", async () => {
    mockClient({ data: null, error: { message: "Insert failed" } });
    await expect(createNote({ title: "Test", body: "Body" })).rejects.toThrow(
      "Insert failed",
    );
  });
});

// ---------------------------------------------------------------------------
// deleteNote
// ---------------------------------------------------------------------------
describe("deleteNote", () => {
  it("resolves without error on success", async () => {
    mockClient({ error: null });
    await expect(deleteNote(1)).resolves.toBeUndefined();
  });

  it("throws when Supabase returns an error", async () => {
    mockClient({ error: { message: "Delete failed" } });
    await expect(deleteNote(1)).rejects.toThrow("Delete failed");
  });
});

// ---------------------------------------------------------------------------
// updateNote
// ---------------------------------------------------------------------------
describe("updateNote", () => {
  it("returns the updated note on success", async () => {
    const updated = { ...NOTE, title: "Updated" };
    mockClient({ data: updated, error: null });
    const result = await updateNote(1, { title: "Updated", body: "Body" });
    expect(result).toEqual(updated);
  });

  it("throws when Supabase returns an error", async () => {
    mockClient({ data: null, error: { message: "Update failed" } });
    await expect(
      updateNote(1, { title: "Updated", body: "Body" }),
    ).rejects.toThrow("Update failed");
  });
});
