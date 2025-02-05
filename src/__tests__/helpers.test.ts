import {
  checkCollision,
  moduleW2LocalWidth,
  moduleX2LocalX,
  moduleY2LocalY,
} from "../helpers";
import { COLUMN_WIDTH, GUTTER_SIZE } from "../constants";
import type { ModuleInterface } from "../types/ModuleInterface";

describe("Helper Functions", () => {
  describe("Dimension Converters", () => {
    test("moduleW2LocalWidth converts width correctly", () => {
      expect(moduleW2LocalWidth(2)).toBe(2 * COLUMN_WIDTH - GUTTER_SIZE);
    });

    test("moduleX2LocalX converts X coordinate correctly", () => {
      expect(moduleX2LocalX(3)).toBe(3 * COLUMN_WIDTH + GUTTER_SIZE);
    });

    test("moduleY2LocalY converts Y coordinate correctly", () => {
      expect(moduleY2LocalY(100)).toBe(100 + GUTTER_SIZE);
    });
  });

  describe("Collision Detection", () => {
    const baseModule: ModuleInterface = {
      id: 1,
      coord: { x: 2, y: 100, w: 2, h: 200 },
    };

    test("detects horizontal collision", () => {
      const others: ModuleInterface[] = [
        {
          id: 2,
          coord: { x: 3, y: 100, w: 2, h: 200 },
        },
      ];
      expect(checkCollision(baseModule, others)).toBe(true);
    });

    test("ignores gutter-spaced modules", () => {
      const others: ModuleInterface[] = [
        {
          id: 2,
          coord: { x: 4, y: 100, w: 2, h: 200 },
        },
      ];
      expect(checkCollision(baseModule, others)).toBe(true);
    });

    test("detects vertical collision", () => {
      const others: ModuleInterface[] = [
        {
          id: 2,
          coord: { x: 2, y: 250, w: 2, h: 200 },
        },
      ];
      expect(checkCollision(baseModule, others)).toBe(true);
    });
  });
});
