import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalofWeek } from "../../../features/calendarSlice/CalendarSlice";

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
        <Box>
          <Typography sx={{ fontSize: "13px", color: color }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: "700",
              color: color,
            }}
          >
            {total}
          </Typography>
        </Box>
        <Link to={to}>
          <Typography sx={{ color: "red", fontSize: "13px" }}>
            Xem chi tiết
          </Typography>
        </Link>
      </Box>
      <Box sx={{ color: color }}>{icon}</Box>
    </Box>
  );
};

export default BoxNoti;
