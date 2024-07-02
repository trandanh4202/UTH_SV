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
        <Typography sx={{ fontSize: "15px", color, fontWeight: "600" }}>
          {title}
        </Typography>
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
        <Box component={Link} to={to}>
          <Typography
            sx={{
              color: "red",
              fontSize: "13px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Xem chi tiết
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          color,

          "& .MuiSvgIcon-root": {
            width: "25px",
            height: "25px",
          },
        }}
      >
        {icon}
      </Box>
    </Box>
  );
};

export default BoxNoti;
