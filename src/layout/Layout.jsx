import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "~/components/header/Header";

const Layout = () => {
  return (
    <Box sx={{ backgroundColor: "#e8ecf0" }}>
      <Header />
      <Box sx={{ margin: "25px 0 50px 0" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
