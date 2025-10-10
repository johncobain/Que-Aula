import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ClassesContainer } from "./classesContainer";
import { IClassesData } from "../../../../types/dataClasses.interface";

// Mock child components to isolate logic
vi.mock("../classTag/classTag", () => ({
  ClassTag: ({ title, onClick, selected }: any) => (
    <div data-testid="class-tag" data-title={title} data-selected={selected} onClick={onClick}>
      ClassTag: {title}
    </div>
  ),
}));

vi.mock("../classListItem/classListItem", () => ({
  ClassListItem: ({ classCode, teacher, description, whichClass, onClick, selected }: any) => (
    <div
      data-testid="class-list-item"
      data-classcode={classCode}
      data-teacher={teacher}
      data-description={description}
      data-whichclass={whichClass}
      data-selected={selected}
      onClick={onClick}
    >
      ClassListItem: {classCode} {whichClass}
    </div>
  ),
}));

vi.mock("../../../../components/switcher/Switcher", () => ({
  Switcher: ({ onClick, selected }: any) => (
    <button data-testid="switcher" data-selected={selected} onClick={onClick}>
      Switcher
    </button>
  ),
}));

describe("ClassesContainer", () => {
  const mockClick = vi.fn();

  const mockData: IClassesData[] = [
    {
      semester: "1",
      greve: false,
      name: "Math",
      description: "Basic algebra",
      multiClass: false,
      classes: [
        {
          weekDay: "Monday",
          period: ["08:00", "09:00"],
          teacher: "John",
          classroom: "101",
          whichClass: "A",
          selected: false,
        },
      ],
    },
    {
      semester: "1",
      greve: false,
      name: "Science",
      description: "Physics and chemistry",
      multiClass: true,
      classes: [
        {
          weekDay: "Tuesday",
          period: ["10:00", "11:00"],
          teacher: "Mary",
          classroom: "102",
          whichClass: "A",
          selected: true,
        },
        {
          weekDay: "Tuesday",
          period: ["10:00", "11:00"],
          teacher: "Mary",
          classroom: "102",
          whichClass: "A",
          selected: true, // duplicate to test filtering
        },
        {
          weekDay: "Wednesday",
          period: ["13:00", "14:00"],
          teacher: "Alex",
          classroom: "103",
          whichClass: "B",
          selected: false,
        },
      ],
    },
    {
      semester: "2",
      name: "History",
      greve: false,
      description: "Ancient civilizations",
      multiClass: false,
      classes: [
        {
          weekDay: "Thursday",
          period: ["15:00", "16:00"],
          teacher: "Linda",
          classroom: "104",
          whichClass: "A",
          selected: false,
        },
      ],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- BASIC RENDER TESTS ---

  it("renders class tags for the given semester when detailed=false", () => {
    render(
      <ClassesContainer
        title="1st Semester"
        semestre={1}
        classesData={mockData}
        onClickTag={mockClick}
        detailed={false}
      />
    );

    const tags = screen.getAllByTestId("class-tag");
    expect(tags.length).toBeGreaterThan(0);
    expect(tags[0]).toHaveTextContent("Math");
    expect(tags[1]).toHaveTextContent("Science A");
    expect(tags[2]).toHaveTextContent("Science B");
  });

  // --- INTERACTION TESTS ---
  it("toggles detailed view when Switcher is clicked", () => {
    render(
      <ClassesContainer
        title="1st Semester"
        semestre={1}
        classesData={mockData}
        onClickTag={mockClick}
        detailed={false}
      />
    );

    const switcher = screen.getByTestId("switcher");

    // starts with tags
    expect(screen.queryAllByTestId("class-tag").length).toBeGreaterThan(0);
    expect(screen.queryAllByTestId("class-list-item").length).toBe(0);

    // click to toggle
    fireEvent.click(switcher);

    // now should show list items
    expect(screen.queryAllByTestId("class-tag").length).toBe(0);
    expect(screen.queryAllByTestId("class-list-item").length).toBeGreaterThan(0);
  });

  it("calls onClickTag when a ClassTag is clicked", () => {
    render(
      <ClassesContainer
        title="1st Semester"
        semestre={1}
        classesData={mockData}
        onClickTag={mockClick}
      />
    );

    const tags = screen.getAllByTestId("class-tag");
    fireEvent.click(tags[0]);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClickTag with correct data when ClassListItem is clicked", () => {
    render(
      <ClassesContainer
        title="1st Semester"
        semestre={1}
        classesData={mockData}
        onClickTag={mockClick}
        detailed={true}
      />
    );

    const items = screen.getAllByTestId("class-list-item");
    fireEvent.click(items[0]);
    expect(mockClick).toHaveBeenCalledWith(mockData[0]);
  });

  // --- REACTIVITY TESTS ---
  it("updates when the detailed prop changes", () => {
    const { rerender } = render(
      <ClassesContainer
        title="1st Semester"
        semestre={1}
        classesData={mockData}
        onClickTag={mockClick}
        detailed={false}
      />
    );

    expect(screen.queryAllByTestId("class-list-item").length).toBe(0);

    rerender(
      <ClassesContainer
        title="1st Semester"
        semestre={1}
        classesData={mockData}
        onClickTag={mockClick}
        detailed={true}
      />
    );

    expect(screen.queryAllByTestId("class-list-item").length).toBeGreaterThan(0);
  });

  it("filters classes correctly by semester", () => {
    render(
      <ClassesContainer
        title="2nd Semester"
        semestre={2}
        classesData={mockData}
        onClickTag={mockClick}
      />
    );

    const tags = screen.getAllByTestId("class-tag");
    expect(tags.length).toBe(1);
    expect(tags[0]).toHaveTextContent("History");
  });
});
