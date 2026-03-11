import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SearchNote from "@/components/SearchNote";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: vi.fn().mockReturnValue(null) }),
}));

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
});

/** Advance timers and flush React state updates. */
async function advance(ms: number) {
  await act(async () => {
    vi.advanceTimersByTime(ms);
  });
}

/** Flush the initial mount useEffect (empty query → push /notes). */
async function flushInitialEffect() {
  await advance(300);
  vi.clearAllMocks();
}

describe("SearchNote", () => {
  it("renders a search input with placeholder", () => {
    render(<SearchNote />);
    expect(screen.getByPlaceholderText("Search notes")).toBeInTheDocument();
  });

  it("debounces route push by 300ms after typing", async () => {
    render(<SearchNote />);
    await flushInitialEffect();

    const input = screen.getByPlaceholderText("Search notes");
    await act(async () => {
      fireEvent.change(input, { target: { value: "react" } });
    });

    // Not yet — debounce still pending
    expect(mockPush).not.toHaveBeenCalled();

    await advance(300);

    expect(mockPush).toHaveBeenCalledOnce();
    expect(mockPush).toHaveBeenCalledWith("/notes?search=react");
  });

  it("resets to /notes when the search query is cleared", async () => {
    render(<SearchNote />);
    await flushInitialEffect();

    const input = screen.getByPlaceholderText("Search notes");

    await act(async () => {
      fireEvent.change(input, { target: { value: "react" } });
    });
    await advance(300);
    expect(mockPush).toHaveBeenCalledWith("/notes?search=react");

    await act(async () => {
      fireEvent.change(input, { target: { value: "" } });
    });
    await advance(300);
    expect(mockPush).toHaveBeenLastCalledWith("/notes");
  });

  it("encodes special characters in the search query", async () => {
    render(<SearchNote />);
    await flushInitialEffect();

    const input = screen.getByPlaceholderText("Search notes");
    await act(async () => {
      fireEvent.change(input, { target: { value: "hello world" } });
    });
    await advance(300);

    expect(mockPush).toHaveBeenCalledWith("/notes?search=hello%20world");
  });

  it("cancels the previous debounce when the user types again before 300ms", async () => {
    render(<SearchNote />);
    await flushInitialEffect();

    const input = screen.getByPlaceholderText("Search notes");

    await act(async () => {
      fireEvent.change(input, { target: { value: "r" } });
    });
    await advance(100); // 100ms in — not fired yet

    await act(async () => {
      fireEvent.change(input, { target: { value: "re" } });
    });
    await advance(100); // 200ms total — still not fired

    expect(mockPush).not.toHaveBeenCalled();

    await advance(300); // debounce from last change fires
    expect(mockPush).toHaveBeenCalledOnce();
    expect(mockPush).toHaveBeenCalledWith("/notes?search=re");
  });
});
