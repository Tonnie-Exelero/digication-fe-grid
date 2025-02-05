import React from 'react';
import { render, screen } from '../../__tests__/test-utils';
import Grid from '../Grid';

describe('Grid Component', () => {
  test('renders correct number of columns', () => {
    render(<Grid height={1000} />);
    const columns = screen.getAllByTestId(/grid-column-/);
    expect(columns).toHaveLength(12);
  });

  test('renders dynamic row count based on container height', () => {
    const { rerender } = render(<Grid height={500} />);
    const initialRows = screen.getAllByTestId(/grid-row-/);

    rerender(<Grid height={1000} />);
    const updatedRows = screen.getAllByTestId(/grid-row-/);

    expect(updatedRows.length).toBeGreaterThan(initialRows.length);
  });
});
