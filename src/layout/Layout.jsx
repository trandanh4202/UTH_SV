import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "~/components/header/Header";
import { getProfile } from "../features/profileSlice/ProfileSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.profile.student);

  useEffect(() => {
    if (!student) {
      dispatch(getProfile());
    }
  }, [dispatch, student]);
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
