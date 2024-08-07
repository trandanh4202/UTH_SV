// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Box, Container, Grid, Paper } from "@mui/material";
import TabsPanel from "./tabPanel/TabsPanel";
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
              </Grid>
              <Grid item xs={12} md={6} lg={4} >
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
