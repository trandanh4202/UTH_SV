import {
  Box,
  Button,
  Container,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PersonalInfo from "./PersonalInfo";

const EditProfile = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container sx={{ backgroundColor: "white" }}>
      <Box sx={{ padding: "10px 5px" }}>
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
                sx={{ color: "#0c6fbe", fontWeight: "700", fontSize: "16px" }}
              >
                Đề xuất cập nhật thông tin
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            textColor="primary"
            indicatorColor="primary"
            aria-label="tabs"
          >
            <Tab
              sx={{
                fontSize: "15px",
                fontWeight: "500",
                "&.Mui-selected": {
                  border: "1px solid #1976d2",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  color: "#1976d2",
                },
              }}
              label="Học phí ngành"
            />
            <Tab
              sx={{
                fontSize: "15px",
                fontWeight: "500",
                "&.Mui-selected": {
                  border: "1px solid #1976d2",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  color: "#1976d2",
                },
              }}
              label="Học phí Trung tâm tiếng Anh"
            />
            <Tab
              sx={{
                fontSize: "15px",
                fontWeight: "500",
                "&.Mui-selected": {
                  border: "1px solid #1976d2",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  color: "#1976d2",
                },
              }}
              label="Học phí Khác"
            />
          </Tabs>
          {selectedTab === 0 && <PersonalInfo />}
          {selectedTab === 1 && <PersonalInfo />}
          {selectedTab === 2 && <PersonalInfo />}
        </Box>
        <Box></Box>
      </Box>
    </Container>
  );
};

export default EditProfile;
