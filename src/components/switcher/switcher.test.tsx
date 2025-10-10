import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Switcher } from "./switcher";

describe("Switcher", () => {
  it("renders label and icon when provided", () => {
    render(<Switcher label="Dark Mode" icon="icon.png" />);
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "icon.png");
  });

  it("renders with correct base classes when not selected", () => {
    render(<Switcher label="Test" selected={false} />);
    const inputWrapper = document.querySelector(".switcher__input")!;
    const ball = document.querySelector(".switcher__ball")!;
    const input = inputWrapper.querySelector("input") as HTMLInputElement;

    expect(input.checked).toBe(false);
    expect(inputWrapper.className).toContain("switcher__input");
    expect(inputWrapper.className).not.toContain("switcher__input--selected");
    expect(ball.className).not.toContain("switcher__ball--selected");
  });

  it("renders with selected classes when selected=true", () => {
    render(<Switcher label="Test" selected />);
    const inputWrapper = document.querySelector(".switcher__input")!;
    const ball = document.querySelector(".switcher__ball")!;
    const input = inputWrapper.querySelector("input") as HTMLInputElement;

    expect(input.checked).toBe(true);
    expect(inputWrapper.className).toContain("switcher__input--selected");
    expect(ball.className).toContain("switcher__ball--selected");
  });

  it("toggles internal state and calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Switcher label="Click me" selected={false} onClick={handleClick} />);

    const container = screen.getByText("Click me").closest(".switcher")!;
    const input = document.querySelector("input[type='checkbox']") as HTMLInputElement;

    expect(input.checked).toBe(false);

    fireEvent.click(container);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(input.checked).toBe(true);

    fireEvent.click(container);
    expect(input.checked).toBe(false);
  });

  it("syncs internal state when external selected prop changes", () => {
    const { rerender } = render(<Switcher label="Sync test" selected={false} />);
    const input = document.querySelector("input[type='checkbox']") as HTMLInputElement;

    expect(input.checked).toBe(false);

    rerender(<Switcher label="Sync test" selected />);
    expect(input.checked).toBe(true);

    rerender(<Switcher label="Sync test" selected={false} />);
    expect(input.checked).toBe(false);
  });
});
