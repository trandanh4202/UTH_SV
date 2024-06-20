/* eslint-disable react/jsx-key */
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Divider, Grid, Tab, Typography } from "@mui/material";
import { useState } from "react";
const TabName = [
  {
    title: "PHÒNG ĐÀO TẠO",
  },
  {
    title: "PHÒNG ĐÀO",
  },
  {
    title: "PHÒNG ĐÀO TẠO",
  },
  {
    title: "PHÒNG ĐÀO",
  },
  {
    title: "PHÒNG ĐÀO TẠO",
  },
  {
    title: "PHÒNG ĐÀO",
  },
  {
    title: "PHÒNG ĐÀO TẠO",
  },
  {
    title: "PHÒNG ĐÀO",
  },
  {
    title: "PHÒNG ĐÀO",
  },
  {
    title: "PHÒNG ĐÀO TẠO",
  },
  {
    title: "PHÒNG ĐÀO",
  },
  {
    title: "PHÒNG ĐÀO",
  },
  {
    title: "PHÒNG ĐÀO TẠO",
  },
  {
    title: "PHÒNG ĐÀO",
  },
];
const TabData = [
  {
    day: 7,
    month: "Tháng 6",
    title: "Thông báo về việc Khảo sát ý kiến bạn đọc năm học 2023-2024",
    description: "Trần Trọng Danh",
  },
  {
    day: 7,
    month: "Tháng 6",
    title: "Thông báo về việc Khảo sát ý kiến bạn đọc năm học 2023-2024",
    description: "Trần Trọng Danh",
  },
];
const TabsPanel = () => {
  const [value, setValue] = useState(0); // Giá trị mặc định là '1' để hiển thị tab "THÔNG BÁO CHUNG"

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        aria-label="lab API tabs example"
        variant="scrollable"
        scrollButtons="auto"
      >
        {TabName.map((item, index) => (
          <Tab
            sx={{ fontSize: "17px", fontWeight: "600" }}
            label={item.title}
            value={index}
          />
        ))}
      </TabList>

      {TabData.map((item, index) => (
        <TabPanel value={index} sx={{ padding: "10px 40px" }}>
          <Grid container spacing={2} sx={{ padding: "10px 20px" }}>
            <Grid item xs={1}>
              <Box
                sx={{
                  border: "1px solid gray",
                  textAlign: "center",
                }}
              >
                <Box sx={{ bgcolor: "#005ab7", padding: "5px" }}>
                  <Typography sx={{ color: "white", fontSize: "15px" }}>
                    {item.month}
                  </Typography>
                </Box>
                <Box sx={{ padding: "5px" }}>
                  <Typography sx={{ color: "#005ab7", fontSize: "30px" }}>
                    {item.day}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={11}>
              <Box>
                <Box>
                  <Typography
                    className="webkit-2"
                    variant="h4"
                    sx={{
                      color: "#005ab7",
                      fontWeight: "600",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    className="webkit-2"
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "red",
                    }}
                  >
                    Xem chi tiết
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider />
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default TabsPanel;
