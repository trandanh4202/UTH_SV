import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { updatePhone } from "../../features/profileSlice/ProfileSlice";

const UpdatePhone = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const phone = useSelector(
    (state) => state.profile.summaryProfile.body?.phone || ""
  );
  const onSubmit = async (data) => {
    await dispatch(updatePhone(data));
  };

  return (
    <>
      <Modal open={!!phone}>
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
    </>
  );
};

export default UpdatePhone;
