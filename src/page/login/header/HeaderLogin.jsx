import { Box } from "@mui/material";

const HeaderLogin = () => {
  return (
    <Box sx={{ bgcolor: "rgb(0, 90, 183)", marginBottom: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="./images/sv_header_login.png" alt="sv_header_login_logo" />
      </Box>
    </Box>
  );
};

export default HeaderLogin;
