import "@testing-library/jest-dom";
import "jest-canvas-mock";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
