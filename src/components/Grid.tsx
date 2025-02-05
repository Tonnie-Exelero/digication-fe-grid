import React from "react";
import { Box } from "@mui/material";
import { COLUMN_WIDTH, GUTTER_SIZE, NUM_COLUMNS } from "../constants";

type GridProps = { height: number };

const Grid = ({ height }: GridProps) => {
  const numRows = Math.ceil(height / (GUTTER_SIZE * 2));

  return (
    <Box
      className="grid"
      position="absolute"
      width="100%"
      height="100%"
      sx={{ pointerEvents: "none" }}
    >
      {[...Array(NUM_COLUMNS)].map((_, i) => (
        <Box
          key={i}
          data-testid={`grid-column-${i}`}
          position="absolute"
          width={COLUMN_WIDTH - GUTTER_SIZE}
          top={0}
          bottom={0}
          left={i * COLUMN_WIDTH + GUTTER_SIZE}
          sx={{ borderInline: "1px dashed #ccc" }}
        />
      ))}
      {[...Array(numRows)].map((_, i) => (
        <Box
          key={i}
          data-testid={`grid-row-${i}`}
          position="absolute"
          width="100%"
          height={GUTTER_SIZE}
          top={i * GUTTER_SIZE * 2}
          sx={{ bgcolor: "#efefef" }}
        />
      ))}
    </Box>
  );
};

export default React.memo(Grid);
