import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/sidebar/Sidebar";

const Layout = () => {
  return (
    <Box sx={{ backgroundColor: "#e8ecf0", height: "100vh" }}>
      <Header />
      <Sidebar />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
