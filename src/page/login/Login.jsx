// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";

import { Box, Container, Grid } from "@mui/material";
import FormLogin2 from "./formLogin2/FormLogin2";
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
      }}
    >
      <Container>
        <Box>
          <Box sx={{}}>
            <Grid container>
              <Grid item xs={8}>
                <Swiper
                  cssMode={true}
                  navigation={true}
                  pagination={true}
                  mousewheel={true}
                  keyboard={true}
                  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img src="./images/slide1.png" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src="./images/slide2.png" alt="" />
                  </SwiperSlide>
                </Swiper>
              </Grid>
              <Grid item xs={4}>
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
