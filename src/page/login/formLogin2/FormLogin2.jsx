import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginPage } from "../../../features/loginSlice/LoginSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormLogin2 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errorMessage } = useSelector((state) => state.login);

  const onSubmit = (data) => {
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
    } else {
      console.log("Please complete the reCAPTCHA");
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  useEffect(() => {
    const token = localStorage.getItem("account");
    console.log("Token in useEffect:", token); // Log token
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Paper
      elevation={4}
      sx={{
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "5px solid white",
        padding: "10px",
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
          {errorMessage && (
            <Alert severity="error" sx={{ margin: "10px 0", fontSize: "15px" }}>
              {errorMessage}
            </Alert>
          )}
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
