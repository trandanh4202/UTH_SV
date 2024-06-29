/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import { useForm } from "react-hook-form";

const ChangePasswordPopup = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Thêm logic để xử lý đổi mật khẩu tại đây
    onClose();
  };

  const newPassword = watch("newPassword", "");

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
          FormHelperTextProps={{
            sx: {
              fontSize: "12px", // Cỡ chữ cho thông báo lỗi
            },
          }}
        >
          <TextField
            label="Mật khẩu cũ (*)"
            type="password"
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
            }}
            InputLabelProps={{
              sx: {
                fontStyle: "italic",
                fontSize: "1.4rem", // Increase font size for label
                color: "gray",
              },
            }}
            FormHelperTextProps={{
              sx: {
                fontSize: "12px", // Cỡ chữ cho thông báo lỗi
              },
            }}
          />
          <TextField
            label="Mật khẩu mới (*)"
            type="password"
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
            }}
            InputLabelProps={{
              sx: {
                fontStyle: "italic",
                fontSize: "1.4rem", // Increase font size for label
                color: "gray",
              },
            }}
            FormHelperTextProps={{
              sx: {
                fontSize: "12px", // Cỡ chữ cho thông báo lỗi
              },
            }}
          />
          <TextField
            label="Xác nhận mật khẩu (*)"
            type="password"
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
            }}
            InputLabelProps={{
              sx: {
                fontStyle: "italic",
                fontSize: "1.4rem", // Increase font size for label
                color: "gray",
              },
            }}
            FormHelperTextProps={{
              sx: {
                fontSize: "12px", // Cỡ chữ cho thông báo lỗi
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
      </Box>
    </Modal>
  );
};

export default ChangePasswordPopup;
