import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import 'jest-canvas-mock';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
