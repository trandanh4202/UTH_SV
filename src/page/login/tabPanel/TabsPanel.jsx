import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Divider, Grid, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryNoti,
  getNewfeeds,
} from "../../../features/notificationSlice/NotificationSlice";
import { format, differenceInDays } from "date-fns";
import { Link } from "react-router-dom";

// Hàm định dạng ngày tháng năm
const formatDate = (dateString) => {
  if (!dateString) return "";
  return format(new Date(dateString), "dd/MM/yyyy");
};

// Hàm kiểm tra xem bài viết có mới hay không
const isNewArticle = (dateString) => {
  if (!dateString) return false;
  const articleDate = new Date(dateString);
  const currentDate = new Date();
  return differenceInDays(currentDate, articleDate) <= 7;
};

const TabsPanel = () => {
  const [id, setId] = useState(368); // Giá trị mặc định là '1' để hiển thị tab "THÔNG BÁO CHUNG"

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
  const categoryTab = useSelector((state) => state.notification.category);
  const newfeeds = useSelector((state) => state.notification.newfeeds);

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
            "& .MuiSvgIcon-root ": {
              height: "3rem",
              width: "3rem",
            },
            color: "red",
          },
        }}
      >
        {categoryTab.map((item, index) => (
          <Tab
            key={index}
            sx={{
              fontSize: "17px",
              fontWeight: "600",
              "&.Mui-selected": {
                color: "#da1d2d",
              },
            }}
            label={item.tenDanhMuc}
            value={item.id}
          />
        ))}
      </TabList>

      <TabPanel
        value={id}
        sx={{
          padding: "10px 40px",
          overflowY: "auto",
          maxHeight: "515px", // Adjust the maxHeight as needed
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#008689",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#008950",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
        }}
      >
        {newfeeds.map((item, index) => (
          <Box key={index}>
            <Grid container spacing={1} sx={{ padding: "10px 20px" }}>
              <Grid item xs={12}>
                <Box component={Link} to={`/newfeeds/${item.id}`}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      className="webkit-2"
                      variant="h4"
                      sx={{
                        color: "#008689",
                        fontWeight: "600",
                        fontSize: "16px",
                      }}
                    >
                      {item.tieuDe}
                    </Typography>
                    {isNewArticle(item.ngayHienThi) === "0" ? (
                      <Box
                        sx={{
                          "&:after": {
                            content: "url(./images/icon_news_new.gif)",
                          },
                        }}
                      ></Box>
                    ) : (
                      ""
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        className="webkit-2"
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {formatDate(item.ngayHienThi)}
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
                </Box>
              </Grid>
            </Grid>
            <Divider />
          </Box>
        ))}
        <Box sx={{ textAlign: "center" }} component={Link} to="/newfeeds">
          <Typography
            sx={{
              color: "red",
              fontSize: "18px",
              fontWeight: "600",
              background: "#c1c0c040",
              padding: "5px",
            }}
          >
            Xem tất cả
          </Typography>
        </Box>
      </TabPanel>
    </TabContext>
  );
};

export default TabsPanel;
