import React, { useState, useEffect, useRef } from "react";
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
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginPage } from "~/features/loginSlice/LoginSlice";
import { useNavigate } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"; // Import từ thư viện reCAPTCHA

const FormLogin2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { executeRecaptcha } = useGoogleReCaptcha(); // Hàm từ thư viện reCAPTCHA

  const onSubmit = async (data) => {
    setSubmitted(true);

    if (executeRecaptcha) {
      try {
        const recaptchaToken = await executeRecaptcha("login"); // Gửi hành động reCAPTCHA

        const combinedData = {
          ...data,
          recaptcha: recaptchaToken,
        };

        const result = await dispatch(loginPage(combinedData));
        const token = localStorage.getItem("account");

        if (token) {
          navigate("/dashboard");
        } else {
          reset(); // Reset form fields
        }
      } catch (error) {
        console.error("reCAPTCHA error:", error);
        reset(); // Reset form fields
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const message = useSelector((state) => state.login.token?.message);
  const status = useSelector((state) => state.login.token?.status);

  useEffect(() => {
    const token = localStorage.getItem("account");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

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
            p: 2,
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
                fontSize: "1.4rem",
              },
            }}
            InputLabelProps={{
              sx: {
                fontStyle: "italic",
                fontSize: "1.4rem",
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
                fontSize: "1.4rem",
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
                fontSize: "1.4rem",
                color: "gray",
              },
            }}
          />
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
              fontSize: "1.4rem",
              padding: "10px 0",
              "&:hover": {
                backgroundColor: "#1D999D",
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
