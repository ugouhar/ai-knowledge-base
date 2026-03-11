import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EditNoteButton from "@/components/EditNoteButton";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("EditNoteButton", () => {
  it("renders an Edit link", () => {
    render(<EditNoteButton id={5} />);
    expect(screen.getByRole("link", { name: "Edit" })).toBeInTheDocument();
  });

  it("points to /notes/[id]/edit", () => {
    render(<EditNoteButton id={5} />);
    expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute(
      "href",
      "/notes/5/edit",
    );
  });
});
