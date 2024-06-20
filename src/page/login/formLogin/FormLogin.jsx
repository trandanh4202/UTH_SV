import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginPage } from "../../../features/loginSlice/LoginSlice";
import { useState } from "react";

const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (recaptchaValue) {
      const combinedData = {
        ...data,
        recaptcha: recaptchaValue,
      };
      dispatch(loginPage(combinedData));
    } else {
      console.log("Please complete the reCAPTCHA");
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <Paper
      elevation="4"
      sx={{
        background: " url('./images/bgUTH.jpg') center center no-repeat ",
        backgroundSize: "cover",
        minHeight: "60vh",
        border: "5px solid white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="./images/congthongtinsinhvien.png" alt="" />
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#044eb7",
            fontWeight: "700",
          }}
        >
          ĐĂNG NHẬP HỆ THỐNG
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2, // Adjust padding
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Mã số sinh viên"
            variant="outlined"
            fullWidth
            {...register("username", {
              required: "Mã số sinh viên là bắt buộc",
            })}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ""}
            InputProps={{
              sx: {
                backgroundColor: "white",
                fontSize: "1.4rem", // Increase font size for input
              },
            }}
            InputLabelProps={{
              sx: {
                fontStyle: "italic",
                fontSize: "1.4rem", // Increase font size for label
                color: "gray",
              },
            }}
          />
          <TextField
            label="Mật khẩu"
            variant="outlined"
            type="password"
            fullWidth
            {...register("password", {
              required: "Mật khẩu là bắt buộc",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            InputProps={{
              sx: {
                backgroundColor: "white",
                fontSize: "1.4rem", // Increase font size for input
              },
            }}
            InputLabelProps={{
              sx: {
                fontStyle: "italic",
                fontSize: "1.4rem", // Increase font size for label
                color: "gray",
              },
            }}
          />

          <Box
            sx={{
              width: "100%",
              "& div div div": {
                width: "100% !important",
              },
            }}
          >
            <ReCAPTCHA
              sitekey="6LfFYvwpAAAAADqIqIyHcx2J-7MDS_mHPVtM8Pin"
              onChange={handleRecaptchaChange}
            />
          </Box>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#ff5a00",
              color: "white",
              fontSize: "1.4rem", // Increase the font size
              padding: "10px 0", // Increase the padding
              "&:hover": {
                backgroundColor: "#e64a00", // Darker shade for hover state
              },
            }}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormLogin;
