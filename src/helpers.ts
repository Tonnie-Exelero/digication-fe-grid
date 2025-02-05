import { COLUMN_WIDTH, GUTTER_SIZE } from "./constants";
import type { ModuleInterface } from "./types/ModuleInterface";

export const moduleW2LocalWidth = (moduleW: number) =>
  moduleW * COLUMN_WIDTH - GUTTER_SIZE;
export const moduleX2LocalX = (moduleX: number) =>
  moduleX * COLUMN_WIDTH + GUTTER_SIZE;
export const moduleY2LocalY = (moduleY: number) => moduleY + GUTTER_SIZE;

/**
 * Checks for collisions between modules considering gutter spacing
 * @param currentModule The module being moved
 * @param otherModules Array of other modules to check against
 * @returns true if collision detected
 */
export const checkCollision = (
  currentModule: ModuleInterface,
  otherModules: ModuleInterface[],
): boolean => {
  const currentLeft = currentModule.coord.x * COLUMN_WIDTH + GUTTER_SIZE;
  const currentRight =
    currentLeft + (currentModule.coord.w * COLUMN_WIDTH - GUTTER_SIZE);
  const currentTop = currentModule.coord.y + GUTTER_SIZE;
  const currentBottom = currentTop + currentModule.coord.h;

  const currentEffective = {
    left: currentLeft - GUTTER_SIZE,
    right: currentRight + GUTTER_SIZE,
    top: currentTop - GUTTER_SIZE,
    bottom: currentBottom + GUTTER_SIZE,
  };

  for (const otherModule of otherModules) {
    const otherLeft = otherModule.coord.x * COLUMN_WIDTH + GUTTER_SIZE;
    const otherRight =
      otherLeft + (otherModule.coord.w * COLUMN_WIDTH - GUTTER_SIZE);
    const otherTop = otherModule.coord.y + GUTTER_SIZE;
    const otherBottom = otherTop + otherModule.coord.h;

    const otherEffective = {
      left: otherLeft - GUTTER_SIZE,
      right: otherRight + GUTTER_SIZE,
      top: otherTop - GUTTER_SIZE,
      bottom: otherBottom + GUTTER_SIZE,
    };

    const overlapX =
      currentEffective.left < otherEffective.right &&
      currentEffective.right > otherEffective.left;
    const overlapY =
      currentEffective.top < otherEffective.bottom &&
      currentEffective.bottom > otherEffective.top;

    if (overlapX && overlapY) return true;
  }

  return false;
};
