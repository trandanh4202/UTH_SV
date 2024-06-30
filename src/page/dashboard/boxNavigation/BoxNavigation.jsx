/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BoxNavigation = ({ index, icon, title, to, status }) => {
  return (
    <Box
      key={index}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textDecoration: "none",
        color: "rgb(77, 161, 232)",
        backgroundColor: status === "loading" ? "rgb(26 15 15 / 20%)" : "white",
        width: "100%",
        height: "100%",
      }}
      component={Link}
      to={to}
    >
      <Box
        sx={{
          padding: "10px",

          "& .MuiSvgIcon-root": {
            width: "35px",
            height: "35px",
          },
        }}
      >
        {icon}
      </Box>
      <Box sx={{ padding: "10px 0" }}>
        <Typography
          sx={{
            fontSize: "13px",
            textAlign: "center",
            color: "rgb(102, 117, 128)",
            fontWeight: "600",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default BoxNavigation;
