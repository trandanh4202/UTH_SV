/* eslint-disable react/prop-types */
import React from "react";

import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BoxNavigation = ({ index, icon, title }) => {
  return (
    <>
      <Box
        key={index} // Đảm bảo key là duy nhất cho mỗi phần tử trong map
        component={Link}
        // to={`/path-for-${item.title}`} // Điều hướng đến đường dẫn tương ứng
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textDecoration: "none",
          color: "rgb(77, 161, 232)",
          borderRadius: "12px",
        }}
      >
        <Box sx={{ padding: "10px" }}>{icon}</Box>
        <Box sx={{ padding: "10px 0" }}>
          <Typography
            sx={{
              fontSize: "13px",
              textAlign: "center",
              color: "black",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default BoxNavigation;
