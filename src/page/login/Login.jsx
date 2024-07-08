// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";

import { Box, Container, Grid, Paper } from "@mui/material";
import FormLogin2 from "./formLogin2/FormLogin2";
import TabsPanel from "./tabPanel/TabsPanel";
// init Swiper:

const Login = () => {
  return (
    <Box
      sx={{
        background: "url(../images/1.jpg) center no-repeat",
        minHeight: "100vh",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Container>
        <Box>
          <Box>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
                height: "100%",
                flexDirection: {
                  xs: "column-reverse",
                  md: "row",
                  lg: "row",
                },
              }}
            >
              <Grid item xs={12} md={6} lg={8} sx={{}}>
                <Box
                  sx={{
                    marginRight: { xs: "0px", lg: "10px" },
                    marginTop: { xs: "10px", lg: "0px" },
                    height: "100%",
                  }}
                >
                  <Paper
                    sx={{
                      width: "100%",
                      // maxHeight: "600px", // Adjust maxHeight as needed
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "18px",
                    }}
                    elevation={6}
                  >
                    <TabsPanel />
                  </Paper>
                </Box>
                {/* <Swiper
                  cssMode={true}
                  navigation={true}
                  pagination={true}
                  mousewheel={true}
                  keyboard={true}
                  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img
                      src="./images/slide1.png"
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src="./images/slide2.png"
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </SwiperSlide>
                </Swiper> */}
              </Grid>
              <Grid item xs={12} md={6} lg={4} sx={{}}>
                <FormLogin2 />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
