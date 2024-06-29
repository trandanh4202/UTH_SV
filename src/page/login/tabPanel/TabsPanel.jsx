/* eslint-disable react/jsx-key */
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Divider, Grid, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryNoti,
  getNewfeeds,
} from "../../../features/notificationSlice/NotificationSlice";

const TabsPanel = () => {
  const [id, setId] = useState(369); // Giá trị mặc định là '1' để hiển thị tab "THÔNG BÁO CHUNG"

  const handleChange = (event, newValue) => {
    setId(newValue);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryNoti());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getNewfeeds({ id }));
  }, [dispatch, id]);
  console.log(id);
  const categoryTab = useSelector((state) => state.notification.category);
  const newfeeds = useSelector((state) => state.notification.newfeeds);
  console.log(newfeeds);
  return (
    <TabContext value={id}>
      <TabList
        onChange={handleChange}
        aria-label="lab API tabs example"
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTabs-scrollButtons.Mui-disabled": { opacity: 0.3 },
          "& .MuiTabs-scrollButtons": {
            "&.Mui-disabled": {
              color: "rgba(0, 0, 0, 0.26)",
            },
            // fontSize: "20px", // Increase the size of arrow buttons
            "& .MuiSvgIcon-root ": {
              height: "3rem",
              width: "3rem",
            },
            color: "red", // Change the color of arrow buttons to red
          },
        }}
      >
        {categoryTab.map((item, index) => (
          <Tab
            key={index}
            sx={{ fontSize: "17px", fontWeight: "600" }}
            label={item.tenDanhMuc}
            value={item.id}
          />
        ))}
      </TabList>

      <TabPanel value={id} sx={{ padding: "10px 40px" }}>
        {newfeeds.map((item, index) => (
          <>
            <Grid container spacing={1} sx={{ padding: "10px 20px" }}>
              <Grid item xs={2}>
                <Box
                  sx={{
                    border: "1px solid gray",
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ bgcolor: "#005ab7", padding: "5px" }}>
                    <Typography sx={{ color: "white", fontSize: "14px" }}>
                      {item.ngayHienThi}
                      dsadsa
                    </Typography>
                  </Box>
                  <Box sx={{ padding: "5px" }}>
                    <Typography sx={{ color: "#005ab7", fontSize: "30px" }}>
                      {item.ngayHienThi}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={10}>
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
                      {item.tieuDe}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      className="webkit-2"
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      {item.noiDung}
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
          </>
        ))}
      </TabPanel>
    </TabContext>
  );
};

export default TabsPanel;
