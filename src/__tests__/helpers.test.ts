import {
  checkCollision,
  moduleW2LocalWidth,
  moduleX2LocalX,
  moduleY2LocalY,
} from "../helpers";
import { ModuleInterface } from "../types/ModuleInterface";
import { COLUMN_WIDTH, GUTTER_SIZE } from "../constants";

describe("Helper Functions", () => {
  test("moduleW2LocalWidth converts correctly", () => {
    expect(moduleW2LocalWidth(2)).toBe(2 * COLUMN_WIDTH - GUTTER_SIZE);
  });

  test("moduleX2LocalX converts correctly", () => {
    expect(moduleX2LocalX(1)).toBe(1 * COLUMN_WIDTH + GUTTER_SIZE);
  });

  test("moduleY2LocalY converts correctly", () => {
    expect(moduleY2LocalY(100)).toBe(100 + GUTTER_SIZE);
  });
});

describe("checkCollision", () => {
  const baseModule: ModuleInterface = {
    id: 1,
    coord: { x: 0, y: 0, w: 2, h: 100 },
  };

  test("should detect no collision between non-overlapping modules", () => {
    const otherModules: ModuleInterface[] = [
      {
        id: 2,
        coord: { x: 3, y: 0, w: 2, h: 100 },
      },
    ];

    expect(checkCollision(baseModule, otherModules)).toBe(false);
  });

  test("should detect collision between overlapping modules", () => {
    const overlappingModule: ModuleInterface[] = [
      {
        id: 2,
        coord: { x: 1, y: 50, w: 2, h: 100 },
      },
    ];

    expect(checkCollision(baseModule, overlappingModule)).toBe(true);
  });

  test("should detect gutter spacing collisions", () => {
    const gutterCollisionModule: ModuleInterface[] = [
      {
        id: 2,
        coord: { x: 2, y: 90, w: 2, h: 100 },
      },
    ];

    expect(checkCollision(baseModule, gutterCollisionModule)).toBe(true);
  });
});
