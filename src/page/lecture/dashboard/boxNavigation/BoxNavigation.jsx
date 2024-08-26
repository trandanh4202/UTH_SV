/* eslint-disable react/prop-types */
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BoxNavigation = ({ index, icon, title, to, status }) => {
  return (
    <Grid
      container
      key={index}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#008689",
        backgroundColor:
          status === "loading" ? "rgb(26 15 15 / 20%)" : "inherit",

        flexWrap: "nowrap",
      }}
      component={Link}
      to={to}
      target={to?.includes("https") ? "_blank" : "_self"}
    >
      <Grid
        item
        xs={12}
        sx={{
          padding: "10px",

          "& .MuiSvgIcon-root": {
            width: "35px",
            height: "35px",
          },
        }}
      >
        {icon}
      </Grid>
      <Grid item xs={12} sx={{ padding: "10px 0" }}>
        <Typography
          sx={{
            fontSize: "14px", 
            textAlign: "center",
            color: "rgb(102, 117, 128)",
            fontWeight: "700",
          }}
        >
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default BoxNavigation;
