import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateEmail } from "../../features/profileSlice/ProfileSlice";

const UpdatePhone = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isUpdateEmail, setIsUpdateEmail] = useState(false);

  const dispatch = useDispatch();
  const message = useSelector((state) => state.profile.updateEmail?.message);
  const status = useSelector((state) => state.profile.updateEmail?.status);
  const email = useSelector((state) => state.profile.profile.body?.email || "");
  const loading = useSelector((state) => state.profile.loading || "");

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await dispatch(updateEmail(data));
    setIsUpdateEmail(true);
  };

  // Hiển thị toast message và chuyển hướng về trang Đăng nhập sau khi thành công
  useEffect(() => {
    if (isUpdateEmail && message) {
      if (status === 200) {
        toast.success(message);

        setTimeout(() => {
          window.locatiion.clear();
        }, 2000);
      } else if (status === 400) {
        toast.error(message);
      }
      setIsUpdateEmail(false);
    }
  }, [isUpdateEmail, message, status, navigate]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Modal open={!!email}>
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
              Cập nhật số điện thoại
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
                label="Số điện thoại mới (*)"
                type={"tel"}
                {...register("updatephone", {
                  required: "Cập nhật số điện thoại là bắt buộc",
                })}
                error={!!errors.updatephone}
                helperText={errors.updatephone?.message}
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
                Cập nhật
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default UpdatePhone;
