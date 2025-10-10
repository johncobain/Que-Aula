import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ClassTag } from "./classTag";
import { mockClassTagTitles } from "../../../../test/mocks/classTag.mock";

describe("ClassTag Component", () => {
  describe("Rendering States", () => {
    it("should render with default props", () => {
      render(<ClassTag />);

      const tag = screen.getByTestId("classTag");
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveClass("form__classes__tag");
      expect(tag).not.toHaveClass("form__classes__tag--selected");
      expect(tag).not.toHaveClass("shimmer");
    });

    it("should render with custom title", () => {
      render(<ClassTag title={mockClassTagTitles.algorithms} />);

      const tag = screen.getByText(mockClassTagTitles.algorithms);
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveClass("form__classes__tag__title");
    });

    it("should render with selected state", () => {
      render(<ClassTag title={mockClassTagTitles.programming} selected={true} />);

      const tagTitle = screen.getByText(mockClassTagTitles.programming);
      const tag = screen.getByTestId("classTag");
      expect(tagTitle).toHaveClass("form__classes__tag__title");
      expect(tag).toHaveClass("form__classes__tag--selected");
    });

    it("should render with loading state", () => {
      render(<ClassTag title={mockClassTagTitles.database} loading={true} />);

      const tag = screen.getByTestId("classTag");
      expect(tag).toHaveClass("form__classes__tag");
      expect(tag).toHaveClass("shimmer");
    });

    it("should render with both selected and loading states", () => {
      render(<ClassTag title={mockClassTagTitles.math} selected={true} loading={true} />);

      const tag = screen.getByTestId("classTag");
      expect(tag).toHaveClass("form__classes__tag");
      expect(tag).toHaveClass("form__classes__tag--selected");
      expect(tag).toHaveClass("shimmer");
    });
  });

  describe("User Interactions", () => {
    it("should call onClick when clicked", () => {
      const mockOnClick = vi.fn();

      render(<ClassTag title={mockClassTagTitles.clickable} onClick={mockOnClick} />);

      const tag = screen.getByText(mockClassTagTitles.clickable);
      fireEvent.click(tag);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should not throw error when onClick is not provided", () => {
      render(<ClassTag title="No Handler" />);

      const tag = screen.getByText("No Handler");

      expect(() => fireEvent.click(tag)).not.toThrow();
    });

    it("should call onClick multiple times when clicked multiple times", () => {
      const mockOnClick = vi.fn();

      render(<ClassTag title={mockClassTagTitles.multiClick} onClick={mockOnClick} />);

      const tag = screen.getByTestId("classTag");
      fireEvent.click(tag);
      fireEvent.click(tag);
      fireEvent.click(tag);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("Props Combinations", () => {
    it("should handle all props together", () => {
      const mockOnClick = vi.fn();

      render(
        <ClassTag title="Complete Test" selected={true} loading={true} onClick={mockOnClick} />
      );

      const tag = screen.getByTestId("classTag");
      expect(tag).toHaveClass("form__classes__tag");
      expect(tag).toHaveClass("form__classes__tag--selected");
      expect(tag).toHaveClass("shimmer");

      fireEvent.click(tag);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should handle falsy props correctly", () => {
      render(
        <ClassTag
          title={mockClassTagTitles.empty}
          selected={false}
          loading={false}
          onClick={undefined}
        />
      );

      const tag = screen.getByTestId("classTag");
      expect(tag).toHaveClass("form__classes__tag");
      expect(tag).not.toHaveClass("form__classes__tag--selected");
      expect(tag).not.toHaveClass("shimmer");
    });
  });
});
