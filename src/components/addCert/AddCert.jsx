/* eslint-disable react/prop-types */
import { ClearOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  addFamily,
  categoryFamily,
} from "../../features/familySlice/FamilySlice";
const inputStyles = {
  "& .MuiInputBase-root": {
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    fontStyle: "italic",
    color: "grey",
    fontSize: "14px",
    "&.Mui-focused": {
      color: "#008588",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "15px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all ease 0.4s",
    padding: { xs: "10px", lg: " 14px" },
    "&:hover": {
      borderColor: "#008588",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#008588 !important",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #008588",
  },

  "& .MuiSvgIcon-root": {
    color: "green",
    backgroundSize: "cover",
  },
};

const selectStyles = {
  "&:focus": {
    borderRadius: "8px",
  },
  borderRadius: "8px",
  "& .MuiInputBase-input": {
    fontSize: "15px",
    backgroundColor: "white",
    color: "grey",
    borderRadius: "8px",
    transition: "all ease 0.4s",
    padding: { xs: "10px", lg: " 14px" },
  },
  "& .MuiSvgIcon-root": {
    color: "#008588",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#008588",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #008588",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#008588",
  },
  "& .MuiSelect-select:focus": {
    borderRadius: "8px",
    borderColor: "#008588",
  },
};
const AddCert = ({ open, onClose, chungChiList, handleSubmit1 }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const fileWatch = watch("fileChungChi"); // Theo dõi thay đổi file

  const onSubmit = (data) => {
    const fileChungChi = fileWatch; // Lấy file ảnh mới từ `watch`

    handleSubmit1({
      ...data,
      idchungchi: data.chuanDauRa, // Lấy id chứng chỉ từ select
      ngayCap: data.ngayCap,
      nguoiCap: data.nguoiCap,
      soHieu: data.soHieu,
      soVaoSo: data.soVaoSo,
      noiCap: data.noiCap,
      soSeri: data.soSeri,
      fileChungChi, // Lưu trữ ảnh mới
    });

    onClose(); // Đóng modal sau khi lưu
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "20px",
          width: { xs: "100%", lg: "50%" },
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
          Thêm chứng chỉ
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
          <Grid container spacing={{ xs: 2, lg: 3 }}>
            <Grid item xs={12} lg={5}>
              <Select
                label="Chuẩn đầu ra"
                {...register("chuanDauRa", { required: true })}
                fullWidth
                defaultValue=""
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Chọn chuẩn đầu ra</em>
                </MenuItem>
                {chungChiList?.map((c) => (
                  <MenuItem key={c.idChungChi} value={c.idChungChi}>
                    {c.tenChungChi}
                  </MenuItem>
                ))}
              </Select>
              {errors.chuanDauRa && (
                <Typography color="error">
                  Vui lòng chọn chuẩn đầu ra
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} lg={7}>
              <TextField
                label="Ngày cấp"
                {...register("ngayCap", { required: "Ngày cấp là bắt buộc" })}
                error={!!errors.ngayCap}
                helperText={errors.ngayCap?.message}
                fullWidth
                sx={inputStyles}
              />
            </Grid>
          </Grid>
          <TextField
            label="Người cấp"
            {...register("nguoiCap", { required: "Người cấp là bắt buộc" })}
            error={!!errors.nguoiCap}
            helperText={errors.nguoiCap?.message}
            fullWidth
            sx={inputStyles}
          />
          <TextField
            label="Số hiệu"
            {...register("soHieu")}
            fullWidth
            sx={inputStyles}
          />
          <TextField
            label="Số vào sổ"
            {...register("soVaoSo")}
            fullWidth
            sx={inputStyles}
          />
          <TextField
            label="Nơi cấp"
            {...register("noiCap")}
            fullWidth
            sx={inputStyles}
          />
          <TextField
            label="Số seri"
            {...register("soSeri")}
            fullWidth
            sx={inputStyles}
          />
          <TextField
            label="File chứng chỉ"
            type="file"
            inputProps={{ accept: "image/*" }}
            {...register("fileChungChi", {
              required: "File chứng chỉ là bắt buộc",
            })}
            error={!!errors.fileChungChi}
            helperText={errors.fileChungChi?.message}
            fullWidth
            sx={inputStyles}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              fontSize: "15px",
              backgroundColor: "#008588",
              color: "white",
              borderRadius: "8px",
              border: "3px solid #0085885a",
              transition: "all ease 0.4s",
              padding: "9px 14px",
              "&:hover": {
                borderColor: "#008689",
                backgroundColor: "white",
                color: "#008689",
                boxShadow: "0 0 10px #008689",
              },
            }}
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCert;
