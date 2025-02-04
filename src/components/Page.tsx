import React from "react";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";

import Grid from "./Grid";
import Module from "./Module";
import { GUTTER_SIZE } from "../constants";
import ModuleInterface from "../types/ModuleInterface";

const initialModules: ModuleInterface[] = [
  { id: 1, coord: { x: 1, y: 80, w: 2, h: 200 } },
  { id: 2, coord: { x: 5, y: 0, w: 3, h: 100 } },
  { id: 3, coord: { x: 4, y: 310, w: 3, h: 200 } },
];

const Page = () => {
  const [modules, setModules] =
    React.useState<ModuleInterface[]>(initialModules);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({ accept: "module" });
  drop(containerRef);

  const handleModuleDrag = (id: number, newX: number, newY: number) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id
          ? { ...module, coord: { ...module.coord, x: newX, y: newY } }
          : module
      )
    );
  };

  const containerHeight =
    Math.max(...modules.map(({ coord: { y, h } }) => y + h)) + GUTTER_SIZE * 2;

  return (
    <Box
      ref={containerRef}
      position="relative"
      width={1024}
      height={containerHeight}
      margin="auto"
      sx={{ outline: "1px dashed #ccc", bgcolor: "white" }}
    >
      <Grid height={containerHeight} />
      {modules.map((module) => (
        <Module
          key={module.id}
          data={module}
          otherModules={modules.filter((m) => m.id !== module.id)}
          onDrag={handleModuleDrag}
        />
      ))}
    </Box>
  );
};

export default React.memo(Page);
