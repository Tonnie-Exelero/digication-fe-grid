import React from "react";
import { Box } from "@mui/material";
import { useDrag, useDragDropManager } from "react-dnd";
import { useRafLoop } from "react-use";

import type { ModuleInterface } from "../types/ModuleInterface";
import { COLUMN_WIDTH, GUTTER_SIZE, NUM_COLUMNS } from "../constants";
import { checkCollision } from "../helpers";

type ModuleProps = {
  data: ModuleInterface;
  otherModules: ModuleInterface[];
  onDrag: (id: number, newX: number, newY: number) => void;
};

const Module = (props: ModuleProps) => {
  const {
    data: {
      id,
      coord: { x, y, w, h },
    },
    otherModules,
    onDrag,
  } = props;
  const [visualPosition, setVisualPosition] = React.useState({
    left: x * COLUMN_WIDTH + GUTTER_SIZE,
    top: y + GUTTER_SIZE,
  });

  const dndManager = useDragDropManager();
  const initialPosition = React.useRef<{ top: number; left: number }>();

  React.useEffect(() => {
    setVisualPosition({
      left: x * COLUMN_WIDTH + GUTTER_SIZE,
      top: y + GUTTER_SIZE,
    });
  }, [x, y]);

  const [stop, start] = useRafLoop(() => {
    const movement = dndManager.getMonitor().getDifferenceFromInitialOffset();

    if (!initialPosition.current || !movement) return;

    const newLeftPx = initialPosition.current.left + movement.x;
    const newTopPx = initialPosition.current.top + movement.y;

    const newX = Math.round((newLeftPx - GUTTER_SIZE) / COLUMN_WIDTH);
    const clampedX = Math.max(0, Math.min(newX, NUM_COLUMNS - w));

    const newY = newTopPx - GUTTER_SIZE;
    const clampedY = Math.max(newY, 0);

    const currentModule = { id, coord: { x: clampedX, y: clampedY, w, h } };
    const isColliding = checkCollision(currentModule, otherModules);

    if (!isColliding) {
      setVisualPosition({
        left: clampedX * COLUMN_WIDTH + GUTTER_SIZE,
        top: clampedY + GUTTER_SIZE,
      });
      onDrag(id, clampedX, clampedY);
    }
  }, false);

  const [, drag] = useDrag(
    () => ({
      type: "module",
      item: () => {
        initialPosition.current = {
          left: visualPosition.left,
          top: visualPosition.top,
        };
        start();
        return { id };
      },
      end: stop,
    }),
    [visualPosition.left, visualPosition.top],
  );

  return (
    <Box
      ref={drag}
      data-testid={`module-${id}`}
      position="absolute"
      border={1}
      borderColor="grey.500"
      bgcolor="rgba(0, 0, 0, 0.5)"
      top={visualPosition.top}
      left={visualPosition.left}
      width={w * COLUMN_WIDTH - GUTTER_SIZE}
      height={h}
      sx={{
        transition: "top 0.2s, left 0.2s",
        cursor: "move",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        fontSize={40}
        color="#fff"
      >
        {id}
      </Box>
    </Box>
  );
};

export default React.memo(Module);
