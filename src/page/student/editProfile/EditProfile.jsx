import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import AvatartInfo from "./AvatartInfo";
import FamilyProfile from "./FamilyProfile";
import { useDispatch, useSelector } from "react-redux";
import { getCheckUpdateProfile } from "../../../features/profileSlice/ProfileSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is small

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCheckUpdateProfile());
  }, [dispatch]);
  const loading = useSelector((state) => state.profile?.loading);
  const success = useSelector((state) => state.profile?.success);
  const message = useSelector((state) => state.profile?.message);
  const timestamp = useSelector((state) => state.profile?.timestamp);

  useEffect(() => {
    if (!loading) {
      if (success && timestamp) {
        toast.success(message);
      } else if (!success) {
        toast.error(message);
      }
    }
  }, [loading, message, success, timestamp]);
  const loadingFamily = useSelector((state) => state.family?.loading);
  const successFamily = useSelector((state) => state.family?.success);
  const messageFamily = useSelector((state) => state.family?.message);
  const timestampFamily = useSelector((state) => state.family?.timestamp);
  useEffect(() => {
    if (!loadingFamily) {
      if (successFamily && timestampFamily) {
        toast.success(messageFamily);
      } else if (!successFamily) {
        toast.error(messageFamily);
      }
    }
  }, [loadingFamily, messageFamily, successFamily, timestampFamily]);
  return (
    <Container>
      <Paper
        elevation={14}
        sx={{
          borderRadius: "10px",
          padding: { xs: "5px", lg: "20px" },
          overflow: "hidden",
        }}
      >
        <Box>
          <Box
            sx={{
              margin: "15px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Divider
                orientation="vertical"
                sx={{
                  color: "red",
                  border: "3px solid",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
              <Typography
                sx={{ color: "#008588", fontWeight: "700", fontSize: "16px" }}
              >
                Đề xuất cập nhật thông tin
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              overflowX: "auto", // Allow horizontal scrolling if needed
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleChangeTab}
              aria-label="tabs"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "red",
                },
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row", // Stack tabs vertically on small screens
                gap: "10px",
                justifyContent: "center",
                overflowX: "auto", // Ensure tabs scroll horizontally on small screens
              }}
            >
              <Tab
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                  padding: "5px 10px",
                  "&.Mui-selected": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "15px",
                    backgroundColor: "#008588",
                    color: "white",
                    transition: "all ease 0.4s",
                    fontWeight: "700",
                  },
                }}
                label="Thông tin cá nhân"
              />
              <Tab
                sx={{
                  fontSize: "15px",
                  padding: "5px 10px",
                  fontWeight: "500",
                  "&.Mui-selected": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "15px",
                    backgroundColor: "#008588",
                    color: "white",
                    fontWeight: "700",
                    transition: "all ease 0.4s",
                  },
                }}
                label="Ảnh sinh viên"
              />
              <Tab
                sx={{
                  fontSize: "15px",
                  padding: "5px 10px",
                  fontWeight: "500",
                  "&.Mui-selected": {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "15px",
                    backgroundColor: "#008588",
                    fontWeight: "700",
                    color: "white",
                    transition: "all ease 0.4s",
                  },
                }}
                label="Gia đình"
              />
            </Tabs>
          </Box>
          <Box sx={{ padding: { xs: "5px", lg: '"20px"' } }}>
            {selectedTab === 0 && <PersonalInfo />}
            {selectedTab === 1 && <AvatartInfo />}
            {selectedTab === 2 && <FamilyProfile />}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfile;
