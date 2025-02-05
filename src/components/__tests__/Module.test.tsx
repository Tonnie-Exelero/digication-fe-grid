import React from "react";
import { render, screen, waitFor } from "../../__tests__/test-utils";
import Module from "../Module";
import type { ModuleInterface } from "../../types/ModuleInterface";
import { COLUMN_WIDTH, GUTTER_SIZE } from "../../constants";
import userEvent from "@testing-library/user-event";

describe("Module Component", () => {
  const mockOnDrag = jest.fn();

  const mockModule: ModuleInterface = {
    id: 1,
    coord: { x: 2, y: 100, w: 2, h: 200 },
  };

  // Calculate initial positions based on mock data
  const initialX = mockModule.coord.x * COLUMN_WIDTH + GUTTER_SIZE;
  const initialY = mockModule.coord.y + GUTTER_SIZE;

  beforeEach(() => {
    render(<Module data={mockModule} otherModules={[]} onDrag={jest.fn()} />);
  });

  test("renders with correct position and dimensions", () => {
    const moduleElement = screen.getByTestId("module-1");

    expect(moduleElement).toHaveStyle({
      left: `${2 * 84.5 + 10}px`,
      top: `${100 + 10}px`,
      width: `${2 * 84.5 - 10}px`,
      height: "200px",
    });
  });

  test("handles invalid drop targets", async () => {
    const user = userEvent.setup();

    const moduleElement = screen.getByTestId("module-1");

    await user.pointer([
      { keys: "[MouseLeft>]", target: moduleElement },
      { coords: { x: initialX, y: initialY } },
      { coords: { x: -150, y: -150 } }, // Drag outside valid area
      "[/MouseLeft]",
    ]);

    await waitFor(() => {
      expect(mockOnDrag).not.toHaveBeenCalled();
    });
  });
});
