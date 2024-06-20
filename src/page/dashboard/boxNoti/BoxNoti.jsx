import { Box, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";

const BoxNoti = ({ title, count, icon, color }) => {
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
        <Box component={Link}>
          <Typography sx={{ color: "red", fontSize: "13px" }}>
            Xem chi tiết
          </Typography>
        </Box>
      </Box>
      <Box>{icon}</Box>
    </Box>
  );
};

export default BoxNoti;
