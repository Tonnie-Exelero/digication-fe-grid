import React from "react";
import { render, screen, fireEvent } from "../../__tests__/test-utils";
import Page from "../Page";

describe("Page Component", () => {
  test("renders initial modules correctly", () => {
    render(<Page />);
    const modules = screen.getAllByTestId(/module-/);
    expect(modules).toHaveLength(3);
  });

  test("expands container height when moving module down", async () => {
    const { container } = render(<Page />);
    const firstModule = container.querySelector('[data-testid="module-1"]');

    const initialHeight = container.firstChild?.clientHeight;

    fireEvent.dragStart(firstModule!);
    fireEvent.drag(firstModule!, {
      clientX: 0,
      clientY: 500,
    });
    fireEvent.dragEnd(firstModule!);

    const updatedHeight = container.firstChild?.clientHeight;
    expect(updatedHeight).toBeGreaterThan(initialHeight!);
  });
});
