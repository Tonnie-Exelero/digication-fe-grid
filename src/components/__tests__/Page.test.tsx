import React from 'react';
import { fireEvent, render, screen } from '../../__tests__/test-utils';
import Page from '../Page';

describe('Page Component', () => {
  test('initializes with default modules', () => {
    render(<Page />);
    const modules = screen.getAllByTestId(/module-/);
    expect(modules).toHaveLength(3);
  });

  test('prevents modules from overlapping', () => {
    render(<Page />);

    const module1 = screen.getByTestId('module-1');
    const module2 = screen.getByTestId('module-2');

    // Get initial positions
    const initialPos1 = module1.getBoundingClientRect();
    const initialPos2 = module2.getBoundingClientRect();

    // Attempt to drag module1 into module2's space
    fireEvent.dragStart(module1);
    fireEvent.drag(module1, {
      clientX: initialPos2.left + 10,
      clientY: initialPos2.top + 10,
    });
    fireEvent.dragEnd(module1);

    // Verify positions didn't change
    const updatedPos1 = module1.getBoundingClientRect();
    expect(updatedPos1.left).toBe(initialPos1.left);
    expect(updatedPos1.top).toBe(initialPos1.top);
  });
});
