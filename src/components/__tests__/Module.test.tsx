import React from "react";
import { render, fireEvent } from "../../__tests__/test-utils";
import Module from "../Module";
import { ModuleInterface } from "../../types/ModuleInterface";

const mockModule: ModuleInterface = {
  id: 1,
  coord: { x: 0, y: 0, w: 2, h: 100 },
};

describe("Module Component", () => {
  test("renders with correct position and dimensions", () => {
    const { container } = render(
      <Module data={mockModule} otherModules={[]} onDrag={jest.fn()} />
    );

    const moduleElement = container.firstChild as HTMLElement;
    expect(moduleElement).toHaveStyle(`
      left: 10px;
      top: 10px;
      width: 158px;
      height: 100px;
    `);
  });

  test("calls onDrag with valid coordinates when moved", async () => {
    const onDragMock = jest.fn();
    const { container } = render(
      <Module data={mockModule} otherModules={[]} onDrag={onDragMock} />
    );

    const moduleElement = container.firstChild as HTMLElement;

    fireEvent.dragStart(moduleElement);
    fireEvent.drag(moduleElement, {
      clientX: 200,
      clientY: 100,
    });
    fireEvent.dragEnd(moduleElement);

    expect(onDragMock).toHaveBeenCalledWith(1, 1, 90);
  });
});
