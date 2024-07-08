import {
  AccountBalance,
  AttachMoney,
  AutoStories,
  CalendarMonth,
  CastForEducation,
  NotificationAdd,
  ReceiptLong,
  School,
  SupportAgent,
  Upcoming,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalofWeek } from "../../features/calendarSlice/CalendarSlice";
import { getCategoryNoti } from "../../features/notificationSlice/NotificationSlice";
import { getSelect } from "../../features/profileSlice/ProfileSlice";
import BoxNavigation from "./boxNavigation/BoxNavigation";
import BoxNoti from "./boxNoti/BoxNoti";
import Courses from "./chart/courses/Courses";
import LearningProgress from "./chart/learningProgress/LearningProgress";
import LearningResults from "./chart/learningResults/LearningResults";
import InforSV from "./inforSV/InforSV";

const data = [
  {
    icon: <CastForEducation sx={{ fontSize: "25px" }} />,
    title: "Trang học trực tuyến",
    // status: "loading",
    to: "https://courses.ut.edu.vn/login/index.php",
  },
  {
    icon: <CalendarMonth sx={{ fontSize: "25px" }} />,
    title: "Kết quả học tập",
    to: "/transcript",
  },
  {
    icon: <SupportAgent sx={{ fontSize: "25px" }} />,
    title: "Hỗ trợ trực tuyến",
    to: "https://support.ut.edu.vn/login.php",
  },
  {
    icon: <AccountBalance sx={{ fontSize: "25px" }} />,
    title: "Thanh toán trực tuyến",
    to: "https://payment.ut.edu.vn/",
  },
  {
    icon: <School sx={{ fontSize: "25px" }} />,
    title: "Chương trình khung",
    // status: "loading",
    to: "/educationprogram",
  },

  {
    icon: <AttachMoney sx={{ fontSize: "25px" }} />,
    title: "Tra cứu công nợ",
    to: "/tuition",
    // status: "loading",
  },
  {
    icon: <ReceiptLong sx={{ fontSize: "25px" }} />,
    title: "Phiếu thu tổng hợp",
    to: "/generalreceipts",
  },
  {
    icon: <AutoStories sx={{ fontSize: "25px" }} />,
    title: "Đăng ký học phần",
    status: "loading",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("account");

  useEffect(() => {
    if (token) {
      dispatch(getSelect());
      dispatch(getTotalofWeek());
      dispatch(getCategoryNoti());
    }
  }, [token, dispatch]);

  const total = useSelector((state) => state.calendar.total);
  const categories = useSelector((state) => state.notification.category);

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
      count: total,
      icon: <Upcoming sx={{ fontSize: "20px" }} />,
      backgroundColor: "rgb(224, 251, 255)",
      color: "rgb(77, 161, 232)",
      to: "/calendar",
    },
  ];
  return (
    <Container>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item lg={7} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={12} xs={12}>
              <Paper sx={{ padding: "15px 10px" }} elevation={4}>
                <InforSV />
              </Paper>
            </Grid>
            {box.map((item, index) => (
              <Grid key={index} item lg={6} xs={12}>
                <Paper
                  sx={{
                    padding: "5px 10px",
                    backgroundColor: item.backgroundColor,
                  }}
                  elevation={3}
                >
                  <BoxNoti
                    title={item.title}
                    icon={item.icon}
                    color={item.color}
                    to={item.to}
                    total={item.count}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item lg={5} xs={12}>
          <Paper
            sx={{
              padding: "5px 10px",
              height: "100%",
              // position: "relative",
              // overflow: "hidden",
              // color: "#fff",
            }}
            elevation={3}
          >
            {/* <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền đen với opacity
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Đang cập nhật
              </Box> */}
            {/* <Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#333333 ",
                  textAlign: "center",
                  margin: "10px 0",
                }}
              >
                Bảng thông báo
              </Typography>
            </Box> */}
            {categories.map((item) => (
              <Box
                key={item.id}
                sx={{
                  margin: "10px",
                }}
              >
                <Box component={Link} to={`/newfeeds/${item.id}`}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#008689",
                    }}
                  >
                    {item.tenDanhMuc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        {data.map((item, index) => (
          <Grid key={index} item lg={1.5} xs={6}>
            <Paper
              sx={{
                height: "100%",
                position: "relative",
                overflow: "hidden",
                color: "#fff",
              }}
              elevation={4}
            >
              {item.status === "loading" ? (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền đen với opacity
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <CircularProgress color="error" />
                </Box>
              ) : null}
              <BoxNavigation
                index={index}
                icon={item.icon}
                title={item.title}
                to={item.to}
                status={item.status}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
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
