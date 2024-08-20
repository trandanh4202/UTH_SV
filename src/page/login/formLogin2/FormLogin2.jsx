import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getOtp,
  loginPage,
  validateOTP,
} from "~/features/loginSlice/LoginSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { resetPassword } from "../../../features/loginSlice/LoginSlice";

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
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [recallOtp, setRecallOtp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { message: getOtpMessage, status: getOtpStatus } =
    useSelector((state) => state.login.getOtp) || {};
  const { message: validateOtpMessage, status: validateOtpStatus } =
    useSelector((state) => state.login.validateOTP) || {};
  const { message: resetPasswordMessage, status: resetPasswordStatus } =
    useSelector((state) => state.login.resetPassword) || {};
  const { message: loginPageMessage, status: loginPageStatus } =
    useSelector((state) => state.login.loginPage) || {};

  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const loading = useSelector((state) => state.login.loading);
  useEffect(() => {
    const token = localStorage.getItem("account");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const onSubmit = async (data) => {
    const recaptchaToken = await executeRecaptcha("login");
    if (!isForgotPassword) {
      const loginData = { ...data, recaptcha: recaptchaToken };
      const results = await dispatch(loginPage(loginData));

      localStorage.getItem("account") ? navigate("/dashboard") : reset();
    } else {
      const forgotPasswordData = {
        ...data,
        authMethod,
        recaptcha: recaptchaToken,
      };
      dispatch(getOtp(forgotPasswordData));
      setUsername(data.username);
    }
  };

  const validateOtp = async (data) => {
    const recaptchaToken = await executeRecaptcha("login");
    dispatch(
      validateOTP({ username, otp: data.otp, recaptcha: recaptchaToken })
    );
    setOtp(data.otp);
  };
  const resetPasswordHandle = async (data) => {
    const recaptchaToken = await executeRecaptcha("login");
    dispatch(
      resetPassword({
        username,
        otp,
        password: data.password,
        recaptcha: recaptchaToken,
      })
    );
    setIsPasswordChanged(true);
  };
  useEffect(() => {
    if (isPasswordChanged && resetPasswordMessage) {
      if (resetPasswordStatus === 200) {
        toast.success(resetPasswordMessage);
        localStorage.clear();

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (resetPasswordStatus === 400) {
        toast.error(resetPasswordMessage);
      }
      setIsPasswordChanged(false);
    }
  }, [isPasswordChanged, resetPasswordMessage, resetPasswordStatus, navigate]);
  return (
    <Paper
      elevation={4}
      sx={{
        border: "5px solid white",
        padding: "10px 25px",
        borderRadius: "18px",
        position: "relative",
      }}
    >
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px 0",
          }}
          component={Link}
          to="dashboard"
        >
          <img
            src="./images/logo_uth.png"
            alt="logo_uth"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
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
        {loading ? (
          <Spinner />
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit(
              recallOtp
                ? onSubmit
                : getOtpStatus === 200 && getOtpMessage && !otp
                ? validateOtp
                : otp
                ? resetPasswordHandle
                : onSubmit
            )}
            sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
            noValidate
            autoComplete="off"
          >
            {getOtpStatus === 200 &&
            getOtpMessage &&
            !otp &&
            isForgotPassword ? (
              <>
                {/* <Grid container spacing={2}> */}
                {/* <Grid item xs={12}> */}
                <TextField
                  label="OTP"
                  variant="outlined"
                  fullWidth
                  {...register("otp", { required: "OTP là bắt buộc" })}
                  error={!!errors.otp}
                  helperText={errors.otp?.message || ""}
                  FormHelperTextProps={{ sx: { fontSize: "11px" } }}
                  InputProps={{
                    sx: { backgroundColor: "white", fontSize: "1.4rem" },
                  }}
                  props
                  InputLabelProps={{
                    sx: {
                      fontStyle: "italic",
                      fontSize: "1.4rem",
                      color: "gray",
                      "&.Mui-focused": { color: "#008689" },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "#008689" },
                    },
                  }}
                />
                {/* </Grid> */}
                {/* <Grid item xs={3}>
                <Button
                  variant="contained"
                  type="button"
                  fullWidth
                  sx={{
                    backgroundColor: "#008689",
                    color: "white",
                    fontSize: "13px",
                    padding: "4px",
                    "&:hover": { backgroundColor: "#1D999D" },
                    fontWeight: "700",
                    height: "100%",
                  }}
                  onClick={() => {
                    setRecallOtp(true);
                    handleSubmit(onSubmit)();
                  }}
                >
                  Gửi lại OTP
                </Button>
              </Grid> */}
                {/* </Grid> */}
                {getOtpMessage && (
                  <Alert
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                    severity={getOtpStatus === 200 ? "success" : "error"}
                  >
                    {getOtpMessage}
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
                  Xác nhận OTP
                </Button>
              </>
            ) : otp && isForgotPassword ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Mật khẩu mới"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...register("password", {
                    required: "Mật khẩu mới là bắt buộc",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message || ""}
                  FormHelperTextProps={{ sx: { fontSize: "11px" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { backgroundColor: "white", fontSize: "1.4rem" },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontStyle: "italic",
                      fontSize: "1.4rem",
                      color: "gray",
                      "&.Mui-focused": { color: "#008689" },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "#008689" },
                    },
                  }}
                />
                <TextField
                  label="Xác nhận mật khẩu mới"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...register("confirmPassword", {
                    required: "Xác nhận mật khẩu là bắt buộc",
                    // validate: (value) =>
                    //   value === watch("password") || "Mật khẩu không khớp",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message || ""}
                  FormHelperTextProps={{ sx: { fontSize: "11px" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { backgroundColor: "white", fontSize: "1.4rem" },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontStyle: "italic",
                      fontSize: "1.4rem",
                      color: "gray",
                      "&.Mui-focused": { color: "#008689" },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "#008689" },
                    },
                  }}
                />
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
                  Đặt lại mật khẩu
                </Button>
              </Box>
            ) : isForgotPassword ? (
              <>
                <FormControl sx={{ textAlign: "center" }}>
                  <FormLabel
                    sx={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "red",
                      "&.Mui-focused": { color: "red" },
                    }}
                  >
                    Chọn phương thức khôi phục
                  </FormLabel>
                  <RadioGroup
                    aria-label="authMethod"
                    value={authMethod}
                    onChange={(e) => setAuthMethod(e.target.value)}
                    row
                    sx={{ alignItems: "center", justifyContent: "center" }}
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
                  label="Tài khoản đăng nhập"
                  variant="outlined"
                  fullWidth
                  {...register("username", {
                    required: "Tài khoản đăng nhập là bắt buộc",
                  })}
                  error={!!errors.username}
                  helperText={errors.username?.message || ""}
                  FormHelperTextProps={{ sx: { fontSize: "11px" } }}
                  InputProps={{
                    sx: { backgroundColor: "white", fontSize: "1.4rem" },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontStyle: "italic",
                      fontSize: "1.4rem",
                      color: "gray",
                      "&.Mui-focused": { color: "#008689" },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "#008689" },
                    },
                  }}
                />
                {authMethod === "phone" ? (
                  <TextField
                    label="Số điện thoại"
                    variant="outlined"
                    fullWidth
                    {...register("phone", {
                      required: "Số điện thoại là bắt buộc",
                      pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message || ""}
                    FormHelperTextProps={{ sx: { fontSize: "11px" } }}
                    InputProps={{
                      sx: { backgroundColor: "white", fontSize: "1.4rem" },
                    }}
                    InputLabelProps={{
                      sx: {
                        fontStyle: "italic",
                        fontSize: "1.4rem",
                        color: "gray",
                        "&.Mui-focused": { color: "#008689" },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": { borderColor: "#008689" },
                      },
                    }}
                  />
                ) : (
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...register("email", {
                      required: "Email là bắt buộc",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email không hợp lệ",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message || ""}
                    FormHelperTextProps={{ sx: { fontSize: "11px" } }}
                    InputProps={{
                      sx: { backgroundColor: "white", fontSize: "1.4rem" },
                    }}
                    InputLabelProps={{
                      sx: {
                        fontStyle: "italic",
                        fontSize: "1.4rem",
                        color: "gray",
                        "&.Mui-focused": { color: "#008689" },
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": { borderColor: "#008689" },
                      },
                    }}
                  />
                )}
                {getOtpMessage && (
                  <Alert
                    sx={{
                      fontSize: "11px",
                    }}
                    severity={getOtpStatus === 200 ? "success" : "error"}
                  >
                    {getOtpMessage}
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
                  Lấy lại mật khẩu
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label="Tài khoản đăng nhập"
                  variant="outlined"
                  fullWidth
                  {...register("username", {
                    required: "Tài khoản đăng nhập là bắt buộc",
                  })}
                  error={!!errors.username}
                  helperText={errors.username?.message || ""}
                  FormHelperTextProps={{ sx: { fontSize: "11px" } }}
                  InputProps={{
                    sx: { backgroundColor: "white", fontSize: "1.4rem" },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontStyle: "italic",
                      fontSize: "1.4rem",
                      color: "gray",
                      "&.Mui-focused": { color: "#008689" },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "#008689" },
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
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message || ""}
                  FormHelperTextProps={{ sx: { fontSize: "11px" } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { backgroundColor: "white", fontSize: "1.4rem" },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontStyle: "italic",
                      fontSize: "1.4rem",
                      color: "gray",
                      "&.Mui-focused": { color: "#008689" },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": { borderColor: "#008689" },
                    },
                  }}
                />
                {loginPageMessage && (
                  <Alert
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                    severity={loginPageStatus === 200 ? "success" : "error"}
                  >
                    {loginPageMessage}
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
              </>
            )}

            <Button
              variant="text"
              fullWidth
              onClick={() => setIsForgotPassword(!isForgotPassword)}
              sx={{ fontSize: "13px", color: "#008689", margin: "10px 0" }}
            >
              {isForgotPassword ? "Đăng nhập" : "Quên mật khẩu?"}
            </Button>
          </Box>
        )}
      </>
    </Paper>
  );
};

export default FormLogin2;
