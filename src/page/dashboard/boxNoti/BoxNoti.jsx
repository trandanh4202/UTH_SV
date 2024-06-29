/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BoxNoti = ({ title, icon, color, to, total }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography sx={{ fontSize: "13px", color }}>{title}</Typography>
        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: "700",
            color,
            marginTop: "5px",
          }}
        >
          {total}
        </Typography>
        <Box
          component={Link}
          to={to}
          sx={{ color: "red", fontSize: "13px", textDecoration: "none" }}
        >
          Xem chi tiết
        </Box>
      </Box>
      <Box sx={{ color }}>{icon}</Box>
    </Box>
  );
};

export default BoxNoti;
