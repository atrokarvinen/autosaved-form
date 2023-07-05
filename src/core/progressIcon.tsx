import { Box, CircularProgress } from "@mui/material";

type ProgressIconProps = {};

export const ProgressIcon = ({}: ProgressIconProps) => {
  return (
    <Box>
      <CircularProgress sx={{ margin: "auto" }} />
    </Box>
  );
};
