import { Box, Container } from "@mui/material";
import TabsPanel from "../login/tabPanel/TabsPanel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../features/profileSlice/ProfileSlice";

const Newfeeds = () => {
  return (
    <Box>
      <Container>
        <TabsPanel />
      </Container>
    </Box>
  );
};

export default Newfeeds;
