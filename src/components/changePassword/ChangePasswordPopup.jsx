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
import { changePassword } from "~/features/loginSlice/LoginSlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ChangePasswordPopup = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [focusedField, setFocusedField] = useState(null); // State để lưu trữ trường đang được focus

  const newPassword = watch("newPassword", ""); // Lấy giá trị newPassword từ form
  const confirmPassword = watch("confirmPassword", ""); // Lấy giá trị confirmPassword từ form

  const togglePasswordVisibility = (type) => {
    if (type === "oldPassword") {
      setShowOldPassword(!showOldPassword);
    } else if (type === "newPassword") {
      setShowNewPassword(!showNewPassword);
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
            type={showOldPassword ? "text" : "password"}
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
                    onClick={() => togglePasswordVisibility("oldPassword")}
                    edge="end"
                    size="large"
                  >
                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
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
            onFocus={() => setFocusedField("oldPassword")} // Xử lý khi trường được focus
            onBlur={() => setFocusedField(null)} // Xử lý khi trường mất focus
            sx={{
              "& fieldset": {
                borderColor: "#008689 !important", // Thiết lập màu viền khi trường được focus
              },
            }}
          />
          <TextField
            label="Mật khẩu mới (*)"
            type={showNewPassword ? "text" : "password"}
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
                "& input:focus fieldset": {
                  borderColor: "#008689 !important", // Thiết lập màu viền khi trường được focus
                },
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("newPassword")}
                    edge="end"
                    size="large"
                  >
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
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
            onFocus={() => setFocusedField("newPassword")} // Xử lý khi trường được focus
            onBlur={() => setFocusedField(null)} // Xử lý khi trường mất focus
            sx={{
              "& fieldset": {
                borderColor: "#008689 !important", // Thiết lập màu viền khi trường được focus
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
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
            onFocus={() => setFocusedField("confirmPassword")} // Xử lý khi trường được focus
            onBlur={() => setFocusedField(null)} // Xử lý khi trường mất focus
            sx={{
              "& fieldset": {
                borderColor: "#008689 !important", // Thiết lập màu viền khi trường được focus
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#008689",
              padding: "10px",
              "&:hover": {
                backgroundColor: "#008699",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "700",
              }}
            >
              Đổi mật khẩu
            </Typography>
          </Button>
        </Box>
      </Box>
      {/* Đảm bảo rằng ToastContainer được render để hiển thị toast message */}
    </Modal>
  );
};

export default ChangePasswordPopup;
