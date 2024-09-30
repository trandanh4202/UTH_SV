import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  getCheckUpdateBHYT,
  updateBHYT,
} from "../../features/profileSlice/ProfileSlice";
import { useEffect, useState } from "react";

const UpdateBHYT = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const checkUpdate = useSelector(
    (state) => state.profile.getCheckUpdateBHYT?.body
  );
  const loading = useSelector((state) => state.profile?.loading);
  const messsage = useSelector((state) => state.profile.updateBHYT?.messsage);
  const timestamp = useSelector((state) => state.profile.updateBHYT?.timestamp);
  const success = useSelector((state) => state.profile.updateBHYT?.success);

  // State để quản lý mở modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Xử lý submit cập nhật BHYT
  const onSubmit = async (maBHYT) => {
    await dispatch(updateBHYT(maBHYT));
  };

  // Khi component mount, call API checkUpdateBHYT
  useEffect(() => {
    const checkBHYTStatus = async () => {
      const result = await dispatch(getCheckUpdateBHYT());
      const bhytStatus = result.payload.body; // Giá trị true/false từ body

      // Mở modal nếu không có mã BHYT
      setIsModalOpen(!bhytStatus);
    };

    checkBHYTStatus();
  }, [dispatch, timestamp, success]);

  return (
    <>
      <Modal open={isModalOpen}>
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
            Cập nhật Bảo hiểm xã hội/ Bảo hiểm y tế
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
              label="Mã Bảo hiểm xã hội/ Bảo hiểm y tế (*)"
              {...register("updatebhyt", {
                required: "Cập nhật mã BHXH/ BHYT là bắt buộc",
              })}
              error={!!errors.updatebhyt}
              helperText={errors.updatebhyt?.message}
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
    </>
  );
};

export default UpdateBHYT;
