import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <CircularProgress
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#008689",
      }}
    />
  );
};

export default Spinner;
