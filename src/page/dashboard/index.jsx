/* eslint-disable react/jsx-key */
import {
  AccountBalance,
  AttachMoney,
  AutoStories,
  CalendarMonth,
  ContactEmergency,
  NotificationAdd,
  ReceiptLong,
  School,
  Upcoming,
  Visibility,
} from "@mui/icons-material";
import { Box, Container, Grid, Paper } from "@mui/material";
import BoxNavigation from "./boxNavigation/BoxNavigation";
import BoxNoti from "./boxNoti/BoxNoti";
import Courses from "./chart/courses/Courses";
import LearningProgress from "./chart/learningProgress/LearningProgress";
import LearningResults from "./chart/learningResults/LearningResults";
import InforSV from "./inforSV/InforSV";
const data = [
  {
    icon: <ContactEmergency sx={{ fontSize: "25px" }} />,
    title: "Thông tin sinh viên",
  },
  {
    icon: <CalendarMonth sx={{ fontSize: "25px" }} />,
    title: "Lịch theo tuần",
  },
  {
    icon: <Visibility sx={{ fontSize: "25px" }} />,
    title: "Lịch toàn trường",
  },
  {
    icon: <AutoStories sx={{ fontSize: "25px" }} />,
    title: "Đăng ký học phần",
  },
  {
    icon: <AttachMoney sx={{ fontSize: "25px" }} />,
    title: "Tra cứu công nợ",
  },
  {
    icon: <AccountBalance sx={{ fontSize: "25px" }} />,
    title: "Thanh toán ",
  },
  {
    icon: <ReceiptLong sx={{ fontSize: "25px" }} />,
    title: "Phiếu thu tổng hợp",
  },
  {
    icon: <School sx={{ fontSize: "25px" }} />,
    title: "Chương trình khung",
  },
];
const box = [
  {
    title: "Nhắc nhở mới, chưa xem",
    count: 0,
    icon: <NotificationAdd sx={{ fontSize: "20px" }} />,
    backgroundColor: "white",
    color: "rgb(102, 117, 128)",
  },
  {
    title: "Lịch học trong tuần",
    count: 5,
    icon: <Upcoming sx={{ fontSize: "20px" }} />,
    backgroundColor: "rgb(224, 251, 255)",
    color: "rgb(77, 161, 232)",
  },
];
const Dashboard = () => {
  return (
    <Container>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box component={Paper} sx={{ padding: "5px 10px" }}>
                <InforSV />
              </Box>
            </Grid>
            {box.map((item, index) => (
              <Grid item xs={6}>
                <Box
                  component={Paper}
                  sx={{
                    padding: "5px 10px",
                    backgroundColor: item.backgroundColor,
                  }}
                >
                  <BoxNoti
                    title={item.title}
                    count={item.count}
                    icon={item.icon}
                    color={item.color}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={12}>
              <Box
                component={Paper}
                sx={{ padding: "5px 10px", height: "100%" }}
              >
                <BoxNoti />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box>
        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
          {data.map((item, index) => (
            <Grid item xs={1.5}>
              <Box component={Paper} sx={{}}>
                <BoxNavigation
                  index={index}
                  icon={item.icon}
                  title={item.title}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <LearningResults />
        </Grid>
        <Grid item xs={3}>
          <LearningProgress />
        </Grid>
        <Grid item xs={4}>
          <Courses />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
