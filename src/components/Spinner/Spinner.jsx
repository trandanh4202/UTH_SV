import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height: "100%",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        zIndex: 9999,
      }}
    >
      <CircularProgress
        sx={{
          color: "#008689",
        }}
      />
    </Box>
  );
};

export default Spinner;
