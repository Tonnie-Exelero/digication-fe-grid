import React from "react";
import { render, screen } from "../../__tests__/test-utils";
import Grid from "../Grid";
import { NUM_COLUMNS } from "../../constants";

describe("Grid Component", () => {
  test("renders correct number of columns", () => {
    render(<Grid height={1000} />);
    const columns = screen.getAllByTestId(/grid-column/);
    expect(columns).toHaveLength(NUM_COLUMNS);
  });

  test("renders rows based on container height", () => {
    const height = 500;
    render(<Grid height={height} />);
    const rows = screen.getAllByTestId(/grid-row/);
    expect(rows.length).toBeGreaterThan(Math.floor(height / 20));
  });
});
