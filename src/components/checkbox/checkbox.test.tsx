import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Checkbox from "./checkbox";

describe("Checkbox", () => {
  it("renders with base and size classes", () => {
    render(<Checkbox size="small" selected={false} onClick={() => {}} />);

    const checkbox = screen.getByRole("button");

    expect(checkbox.className).toContain("checkbox");
    expect(checkbox.className).toContain("checkbox--small");
    expect(checkbox.className).not.toContain("checkbox--selected");
  });

  it("renders with selected class", () => {
    render(<Checkbox size="small" selected={true} />);

    const checkbox = screen.getByRole("button");
    expect(checkbox.className).toContain("checkbox--selected");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(<Checkbox size="large" selected={false} onClick={handleClick} />);

    const checkbox = screen.getByRole("button");
    fireEvent.click(checkbox);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
