/* eslint-disable react/jsx-key */
import { NotificationAdd, Upcoming } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getTotalofWeek } from "../../../features/calendarSlice/CalendarSlice";
import { getBoxNav, getMenu } from "../../../features/menuSlice/MenuSlice";
import BoxNavigation from "./boxNavigation/BoxNavigation";
import BoxNoti from "./boxNoti/BoxNoti";
import InforGV from "./inforGV/InforGV";
const formatDate = (dateString) => {
  if (!dateString) return "";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const DashboardLecture = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("account");

  const total = useSelector((state) => state.calendar?.total);

  const categories = useSelector((state) => state.notification?.category);
  const [id, setId] = useState("368");
  const newfeeds = useSelector((state) => state.notification?.newfeeds.content);

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
      title: "Lịch dạy trong tuần",
      count: total,
      icon: <Upcoming sx={{ fontSize: "20px" }} />,
      backgroundColor: "rgba(29, 153, 157, 1)",
      color: "white",
      to: "/calendar",
    },
  ];
  useEffect(() => {
    dispatch(getMenu());
    dispatch(getTotalofWeek());
    dispatch(getBoxNav());
  }, [dispatch]);
  const { boxNav } = useSelector((state) => state.menu);

  return (
    <Container>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item lg={7} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={12} xs={12}>
              <Paper sx={{ padding: "15px 10px" }} elevation={4}>
                <InforGV />
              </Paper>
            </Grid>
            {box?.map((item, index) => (
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
              padding: "10px",
              height: "100%",
            }}
            elevation={3}
          >
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              // loop={true}
              onSlideChange={(swiper) => {
                const slide =
                  categories[swiper.activeIndex % categories.length];
                setId(slide?.id);
              }}
            >
              {categories?.map((item) => (
                <SwiperSlide key={item.id}>
                  <Box component={Link} to={`/newfeeds/${id}`}>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "800",
                        color: "#008689",
                        textAlign: "center",
                      }}
                    >
                      {item.tenDanhMuc}
                    </Typography>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            {newfeeds && newfeeds.length > 0 && (
              <Swiper
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
                loop={true}
              >
                {newfeeds?.map((article) => (
                  <SwiperSlide key={article?.id}>
                    <Box component={Link} to={`/newfeeds/${id}/${article?.id}`}>
                      <Box sx={{ textAlign: "center" }}>
                        {article.hinhDaiDien ? (
                          <img
                            src={article.hinhDaiDien}
                            style={{
                              objectFit: "contain",
                              width: "75%",
                              // height: "75%",
                            }}
                            alt="anhdaidien"
                          />
                        ) : (
                          <img
                            src="/images/news.png"
                            style={{
                              objectFit: "contain",
                              width: "75%",
                              // height: "75%",
                            }}
                            alt="anhdaidien"
                          />
                        )}
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            color: "#d91b2c",
                            textAlign: "center",
                            fontWeight: "500",
                          }}
                        >
                          {formatDate(article.ngayHienThi)}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "800",
                            color: "#008689",
                            textAlign: "center",
                            // marginTop: "20px",
                            marginBottom: "35px",
                          }}
                          className="webkit-2"
                        >
                          {article?.tieuDe}
                        </Typography>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        {boxNav?.map((item, index) => (
          <Grid key={index} item lg={1.5} xs={6}>
            <Paper
              sx={{
                height: "100%",
                position: "relative",
                overflow: "hidden",
                color: "#fff",
                transition: "all ease 0.5s ",
                verticalAlign: "top",
                "&:hover": {
                  backgroundColor: "#008689",
                  color: "white",
                  boxShadow: "0 0 10px #008689",
                  "& p, & svg": {
                    color: "white",
                  },
                },
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
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <CircularProgress color="error" />
                </Box>
              ) : (
                <BoxNavigation
                  index={index}
                  icon={item.icon}
                  title={item.name}
                  to={item.route}
                  status={item.isActive}
                />
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item lg={5} xs={12}></Grid>
        <Grid item lg={3} xs={12}></Grid>
        <Grid item lg={4} xs={12}></Grid>
      </Grid>
    </Container>
  );
};

export default DashboardLecture;
