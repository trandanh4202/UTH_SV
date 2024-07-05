import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../features/loginSlice/LoginSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ChangePasswordPopup = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const newPassword = watch("newPassword", ""); // Lấy giá trị newPassword từ form

  const togglePasswordVisibility = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const dispatch = useDispatch();
  const message = useSelector((state) => state.login.message);
  const status = useSelector((state) => state.login.status);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await dispatch(changePassword(data));
    setIsPasswordChanged(true);
  };

  // Hiển thị toast message và chuyển hướng về trang Đăng nhập sau khi thành công
  useEffect(() => {
    if (isPasswordChanged && message) {
      if (status === 200) {
        toast.success(message);
        localStorage.clear();

        // Chuyển hướng người dùng về trang Đăng nhập sau 2 giây
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (status === 400) {
        toast.error(message);
      }
      setIsPasswordChanged(false);
    }
  }, [isPasswordChanged, message, status, navigate, onClose]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "20px",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            color: "black",
            fontWeight: "600",
            fontSize: "20px",
          }}
        >
          Đổi mật khẩu
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Mật khẩu cũ (*)"
            type={showPassword ? "text" : "password"}
            {...register("oldPassword", {
              required: "Mật khẩu cũ là bắt buộc",
            })}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
            fullWidth
            InputProps={{
              sx: {
                backgroundColor: "white",
                fontSize: "1.4rem", // Increase font size for input
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("password")}
                    edge="end"
                    size="large"
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
          <TextField
            label="Mật khẩu mới (*)"
            type={showPassword ? "text" : "password"}
            {...register("newPassword", {
              required: "Mật khẩu mới là bắt buộc",
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            fullWidth
            InputProps={{
              sx: {
                backgroundColor: "white",
                fontSize: "1.4rem", // Increase font size for input
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("password")}
                    edge="end"
                    size="large"
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
          <TextField
            label="Xác nhận mật khẩu (*)"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Xác nhận mật khẩu là bắt buộc",
              validate: (value) =>
                value === newPassword || "Mật khẩu xác nhận không khớp",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
            InputProps={{
              sx: {
                backgroundColor: "white",
                fontSize: "1.4rem", // Increase font size for input
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    edge="end"
                    size="large"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#33b5e5",
              padding: "10px",
            }}
          >
            Đổi mật khẩu
          </Button>
        </Box>
        <ToastContainer autoClose={2000} />
      </Box>
      {/* Đảm bảo rằng ToastContainer được render để hiển thị toast message */}
    </Modal>
  );
};

export default ChangePasswordPopup;
