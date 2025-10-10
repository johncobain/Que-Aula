import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ClassListItem } from "./classListItem";

// Mock Checkbox component to isolate behavior
vi.mock("../../../../components/checkbox/checkbox", () => ({
  default: ({ selected, size }: { selected: boolean; size: string }) => (
    <div data-testid="checkbox" data-selected={selected} data-size={size}></div>
  ),
}));

describe("ClassListItem", () => {
  const defaultProps = {
    classCode: "MATH101",
    teacher: "John Doe",
    description: "Introduction to Algebra",
    whichClass: "A1",
    onClick: vi.fn(),
  };

  it("renders all text content", () => {
    render(<ClassListItem {...defaultProps} />);

    expect(screen.getByText(/MATH101 - John Doe/i)).toBeInTheDocument();
    expect(screen.getByText("A1")).toBeInTheDocument();
    expect(screen.getByText(/Introduction to Algebra/i)).toBeInTheDocument();
  });

  it("applies correct base classes when not selected", () => {
    render(<ClassListItem {...defaultProps} selected={false} />);

    const container = screen.getByText(/MATH101 - John Doe/i).closest("div");
    const title = screen.getByText(/MATH101 - John Doe/i);

    expect(container?.className).toContain("form__classes__classListItem");
    expect(container?.className).not.toContain("form__classes__classListItem--selected");
    expect(title.className).toContain("form__classes__classListItem__title");
    expect(title.className).not.toContain("form__classes__classListItem__title--selected");
  });

  it("applies selected classes when selected=true", () => {
    render(<ClassListItem {...defaultProps} selected />);

    const container = document.querySelector(".form__classes__classListItem");
    const title = screen.getByText(/MATH101 - John Doe/i);

    expect(container?.className).toContain("form__classes__classListItem--selected");
    expect(title.className).toContain("form__classes__classListItem__title--selected");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<ClassListItem {...defaultProps} onClick={handleClick} />);

    const container = screen.getByText(/MATH101 - John Doe/i).closest("div");
    fireEvent.click(container!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
