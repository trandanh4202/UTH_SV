import { Box, Grid } from "@mui/material";
import FormLogin from "./formLogin/FormLogin";
import HeaderLogin from "./header/HeaderLogin";
import TabsPanel from "./tabPanel/TabsPanel";

const Login = () => {
  return (
    <>
      <HeaderLogin />
      <Box sx={{ padding: "30px 0" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TabsPanel />
            </Grid>
            <Grid item xs={2}>
              <FormLogin />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Login;
