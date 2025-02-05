import type { RenderOptions } from '@testing-library/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <DndProvider backend={HTML5Backend}>{children}</DndProvider>
);

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render, render as backendRender, screen, fireEvent, waitFor };
