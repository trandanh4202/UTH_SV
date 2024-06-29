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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelect } from "../../features/profileSlice/ProfileSlice";
import BoxNavigation from "./boxNavigation/BoxNavigation";
import BoxNoti from "./boxNoti/BoxNoti";
import Courses from "./chart/courses/Courses";
import LearningProgress from "./chart/learningProgress/LearningProgress";
import LearningResults from "./chart/learningResults/LearningResults";
import InforSV from "./inforSV/InforSV";
import { getTotalofWeek } from "../../features/calendarSlice/CalendarSlice";
const data = [
  {
    icon: <ContactEmergency sx={{ fontSize: "25px" }} />,
    title: "Trang học trực tuyến",
  },
  {
    icon: <CalendarMonth sx={{ fontSize: "25px" }} />,
    title: "Kết quả học tập",
    to: "/transcript",
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
    to: "",
  },
  {
    title: "Lịch học trong tuần",
    count: 5,
    icon: <Upcoming sx={{ fontSize: "20px" }} />,
    backgroundColor: "rgb(224, 251, 255)",
    color: "rgb(77, 161, 232)",
    to: "/calendar",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("account");

  useEffect(() => {
    if (token) {
      dispatch(getSelect());
      dispatch(getTotalofWeek());
    }
  }, [token, dispatch]);
  const total = useSelector((state) => state.calendar.total);
  return (
    <Container>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item lg={7} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={12} xs={12}>
              <Box component={Paper} sx={{ padding: "15px 10px" }}>
                <InforSV />
              </Box>
            </Grid>
            {box.map((item) => (
              <Grid item lg={6} xs={12}>
                <Box
                  component={Paper}
                  sx={{
                    padding: "5px 10px",
                    backgroundColor: item.backgroundColor,
                  }}
                >
                  <BoxNoti
                    title={item.title}
                    icon={item.icon}
                    color={item.color}
                    to={item.to}
                    total={total}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item lg={5} xs={12}>
          <Grid container sx={{ height: "100%" }}>
            <Grid item lg={12} xs={12}>
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
            <Grid item lg={1.5} xs={6}>
              <Box component={Paper} sx={{}}>
                <BoxNavigation
                  index={index}
                  icon={item.icon}
                  title={item.title}
                  to={item.to}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item lg={5} xs={12}>
          <LearningResults />
        </Grid>
        <Grid item lg={3} xs={12}>
          <LearningProgress />
        </Grid>
        <Grid item lg={4} xs={12}>
          <Courses />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
