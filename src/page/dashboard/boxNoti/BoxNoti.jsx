import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BoxNoti = ({ title, count, icon, color, to }) => {
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
            {count}
          </Typography>
        </Box>
        <Link to="/transcript">
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
