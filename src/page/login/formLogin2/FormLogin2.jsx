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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginPage } from "~/features/loginSlice/LoginSlice";
import { useNavigate } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const FormLogin2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState("phone");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = async (data) => {
    if (!isForgotPassword) {
      // Logic đăng nhập
      const recaptchaToken = await executeRecaptcha("login");
      const combinedData = { ...data, recaptcha: recaptchaToken };
      const result = await dispatch(loginPage(combinedData));
      const token = localStorage.getItem("account");
      if (token) {
        navigate("/dashboard");
      } else {
        reset();
      }
    } else {
      // Logic khôi phục mật khẩu
      console.log("Khôi phục mật khẩu:", data);
      // Xử lý khôi phục mật khẩu ở đây
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleForgotPasswordClick = () => setIsForgotPassword(true);
  const handleBackToLoginClick = () => setIsForgotPassword(false);

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
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#da1c2d",
            fontWeight: "700",
            margin: "20px 0 10px 0",
          }}
        >
          {isForgotPassword ? "KHÔI PHỤC MẬT KHẨU" : "ĐĂNG NHẬP HỆ THỐNG"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
          noValidate
          autoComplete="off"
        >
          {!isForgotPassword ? (
            <>
              <TextField
                label="Tài khoản đăng nhập"
                variant="outlined"
                fullWidth
                {...register("username", {
                  required: "Tài khoản đăng nhập là bắt buộc",
                })}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ""}
                FormHelperTextProps={{
                  sx: { fontSize: "11px" },
                }}
                InputProps={{
                  sx: { backgroundColor: "white", fontSize: "1.4rem" },
                }}
                InputLabelProps={{
                  sx: {
                    fontStyle: "italic",
                    fontSize: "1.4rem",
                    color: "gray",
                    "&.Mui-focused": {
                      color: "#008689",
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#008689",
                    },
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
                FormHelperTextProps={{
                  sx: { fontSize: "11px" },
                }}
                InputProps={{
                  sx: { backgroundColor: "white", fontSize: "1.4rem" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
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
                    "&.Mui-focused": {
                      color: "#008689",
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#008689",
                    },
                  },
                }}
              />
              {message && status !== 200 && (
                <Alert
                  severity="error"
                  sx={{ margin: "10px 0", fontSize: "15px" }}
                >
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
                  fontSize: "15px",
                  padding: "10px 0",
                  "&:hover": { backgroundColor: "#1D999D" },
                  margin: "20px 0",
                  fontWeight: "700",
                }}
              >
                Đăng nhập
              </Button>
              <Button
                onClick={handleForgotPasswordClick}
                sx={{ color: "#008689", fontSize: "13px" }}
              >
                Quên mật khẩu?
              </Button>
            </>
          ) : (
            <>
              <FormControl
                sx={{
                  textAlign: "center",
                }}
              >
                <FormLabel
                  sx={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "red",
                    "&.Mui-focused": {
                      color: "red",
                    },
                  }}
                >
                  Chọn phương thức khôi phục
                </FormLabel>
                <RadioGroup
                  aria-label="authMethod"
                  value={authMethod}
                  onChange={(e) => setAuthMethod(e.target.value)}
                  row
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormControlLabel
                    value="phone"
                    control={
                      <Radio
                        sx={{
                          width: 30,
                          height: 30,
                          "&.Mui-checked": { color: "#008689" },
                          "&.Mui-checked + .MuiFormControlLabel-label ": {
                            color: "#008689",
                            fontSize: "14px",
                            fontWeight: "700",
                          },
                        }}
                      />
                    }
                    label="Số điện thoại"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "15px",
                        color: "rgb(102, 117, 128)",
                        fontWeight: "500",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="email"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": { color: "#008689" },
                          "&.Mui-checked + .MuiFormControlLabel-label ": {
                            color: "#008689",
                            fontSize: "14px",
                            fontWeight: "700",
                          },
                        }}
                      />
                    }
                    label="Email"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "15px",
                        color: "rgb(102, 117, 128)",
                        fontWeight: "500",
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                label="Nhập tài khoản đăng nhập"
                variant="outlined"
                fullWidth
                {...register("studentId", {
                  required: "Tài khoản đăng nhập là bắt buộc",
                })}
                error={!!errors.studentId}
                helperText={errors.studentId ? errors.studentId.message : ""}
                FormHelperTextProps={{
                  sx: { fontSize: "11px" },
                }}
                InputProps={{
                  sx: { backgroundColor: "white", fontSize: "1.4rem" },
                }}
                InputLabelProps={{
                  sx: {
                    fontStyle: "italic",
                    fontSize: "1.4rem",
                    color: "gray",
                    "&.Mui-focused": {
                      color: "#008689",
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#008689",
                    },
                  },
                }}
              />
              {authMethod === "phone" ? (
                <TextField
                  label="Nhập số điện thoại"
                  variant="outlined"
                  fullWidth
                  {...register("phone", {
                    required: "Số điện thoại là bắt buộc",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Số điện thoại phải đủ 10 số",
                    },
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone.message : ""}
                  FormHelperTextProps={{
                    sx: { fontSize: "11px" },
                  }}
                  InputProps={{
                    sx: { backgroundColor: "white", fontSize: "1.4rem" },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontStyle: "italic",
                      fontSize: "1.4rem",
                      color: "gray",
                      "&.Mui-focused": {
                        color: "#008689",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#008689",
                      },
                    },
                  }}
                />
              ) : (
                <TextField
                  label="Nhập email"
                  variant="outlined"
                  fullWidth
                  {...register("email", {
                    required: "Email là bắt buộc",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@ut\.edu\.vn$/,
                      message: "Email phải có đuôi @ut.edu.vn",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  FormHelperTextProps={{
                    sx: { fontSize: "11px" },
                  }}
                  InputProps={{
                    sx: { backgroundColor: "white", fontSize: "1.4rem" },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontStyle: "italic",
                      fontSize: "1.4rem",
                      color: "gray",
                      "&.Mui-focused": {
                        color: "#008689",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#008689",
                      },
                    },
                  }}
                />
              )}

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "#008689",
                  color: "white",
                  fontSize: "15px",
                  padding: "10px 0",
                  "&:hover": { backgroundColor: "#1D999D" },
                  margin: "20px 0",
                  fontWeight: "700",
                }}
              >
                Xác nhận
              </Button>
              <Button
                onClick={handleBackToLoginClick}
                sx={{ color: "#008689", fontSize: "13px" }}
              >
                Quay lại đăng nhập
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default FormLogin2;
