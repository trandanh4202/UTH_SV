import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  getSelect,
} from "../../features/profileSlice/ProfileSlice";
import { getTotalofWeek } from "../../features/calendarSlice/CalendarSlice";
import { getCategoryNoti } from "../../features/notificationSlice/NotificationSlice";
import BoxNavigation from "./boxNavigation/BoxNavigation";
import BoxNoti from "./boxNoti/BoxNoti";
import Courses from "./chart/courses/Courses";
import LearningProgress from "./chart/learningProgress/LearningProgress";
import LearningResults from "./chart/learningResults/LearningResults";
import InforSV from "./inforSV/InforSV";
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

const data = [
  {
    icon: <ContactEmergency sx={{ fontSize: "25px" }} />,
    title: "Trang học trực tuyến",
    status: "loading",
  },
  {
    icon: <CalendarMonth sx={{ fontSize: "25px" }} />,
    title: "Kết quả học tập",
    to: "/transcript",
  },
  {
    icon: <Visibility sx={{ fontSize: "25px" }} />,
    title: "Lịch toàn trường",
    status: "loading",
  },
  {
    icon: <AutoStories sx={{ fontSize: "25px" }} />,
    title: "Đăng ký học phần",
    status: "loading",
  },
  {
    icon: <AttachMoney sx={{ fontSize: "25px" }} />,
    title: "Tra cứu công nợ",
    status: "loading",
  },
  {
    icon: <AccountBalance sx={{ fontSize: "25px" }} />,
    title: "Thanh toán ",
    status: "loading",
  },
  {
    icon: <ReceiptLong sx={{ fontSize: "25px" }} />,
    title: "Phiếu thu tổng hợp",
    status: "loading",
  },
  {
    icon: <School sx={{ fontSize: "25px" }} />,
    title: "Chương trình khung",
    status: "loading",
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
  const [loadingInfoSV, setLoadingInfoSV] = useState(true); // State để xác định trạng thái loading thông tin sinh viên

  useEffect(() => {
    if (token) {
      dispatch(getSelect());
      dispatch(getTotalofWeek());
      dispatch(getCategoryNoti());
      dispatch(getProfile())
        .then(() => setLoadingInfoSV(false)) // Khi dữ liệu đã tải xong, set loadingInfoSV về false
        .catch(() => setLoadingInfoSV(false)); // Xử lý lỗi khi fetch dữ liệu
    }
  }, [token, dispatch]);

  const total = useSelector((state) => state.calendar.total);
  const categories = useSelector((state) => state.notification.category);

  return (
    <Container>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item lg={7} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={12} xs={12}>
              <Paper sx={{ padding: "15px 10px" }}>
                {loadingInfoSV ? ( // Kiểm tra trạng thái loading để hiển thị placeholder hoặc nội dung
                  <Box
                    sx={{
                      height: "100px", // Chiều cao của placeholder
                      backgroundColor: "#f0f0f0", // Màu nền placeholder
                    }}
                  />
                ) : (
                  <InforSV />
                )}
              </Paper>
            </Grid>
            {box.map((item, index) => (
              <Grid key={index} item lg={6} xs={12}>
                <Paper
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
              position: "relative",
              overflow: "hidden",
              color: "#fff",
            }}
          >
            {" "}
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
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Đang cập nhật
            </Box>
            {categories.map((item) => (
              <Box
                key={item.id}
                sx={{
                  margin: "20px",
                  position: "relative",
                }}
              >
                <Box>
                  <Badge color="error" badgeContent={4}>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#37b4e1",
                      }}
                    >
                      {item.tenDanhMuc}
                    </Typography>
                  </Badge>
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
