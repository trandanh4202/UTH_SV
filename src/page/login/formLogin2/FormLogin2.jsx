import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginPage } from "~/features/loginSlice/LoginSlice";
import { useNavigate } from "react-router-dom";

const FormLogin2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false); // State để theo dõi đã nhấn nút Đăng nhập hay chưa

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setSubmitted(true); // Đánh dấu là đã nhấn nút Đăng nhập
    if (recaptchaValue) {
      const combinedData = {
        ...data,
        recaptcha: recaptchaValue,
      };
      dispatch(loginPage(combinedData)).then(() => {
        const token = localStorage.getItem("account");
        if (token) {
          navigate("/dashboard");
        }
      });
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  useEffect(() => {
    const token = localStorage.getItem("account");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const message = useSelector((state) => state.login.token?.message);
  const status = useSelector((state) => state.login.token?.status);

  return (
    <Paper
      elevation={4}
      sx={{
        border: "5px solid white",
        padding: "10px 25px",
        borderRadius: "18px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <img
          src="./images/logo_uth.png"
          alt="logo_uth"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#da1c2d",
            fontWeight: "700",
            margin: "20px 0",
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
            label="Tài khoản đăng nhập"
            variant="outlined"
            fullWidth
            {...register("username", {
              required: "Tài khoản đăng nhập là bắt buộc",
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
            type={showPassword ? "text" : "password"}
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
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
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
          {/* Hiển thị thông báo lỗi nếu đã nhấn nút Đăng nhập mà chưa nhập reCAPTCHA */}
          {submitted && !recaptchaValue && (
            <Alert severity="error" sx={{ margin: "10px 0", fontSize: "15px" }}>
              Vui lòng hoàn thành bước xác thực reCAPTCHA.
            </Alert>
          )}
          {message && status !== 200 && (
            <Alert severity="error" sx={{ margin: "10px 0", fontSize: "15px" }}>
              {message}
            </Alert>
          )}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#008689",
              color: "white",
              fontSize: "1.4rem", // Increase the font size
              padding: "10px 0", // Increase the padding
              "&:hover": {
                backgroundColor: "#1D999D", // Darker shade for hover state
              },
              margin: "20px 0",
            }}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormLogin2;
