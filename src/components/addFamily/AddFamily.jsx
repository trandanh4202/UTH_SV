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
import { useNavigate } from "react-router-dom";
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

const AddFamily = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const dispatch = useDispatch();
  const message = useSelector((state) => state.family.addFamily?.message);
  const status = useSelector((state) => state.family.addFamily?.status);
  const loading = useSelector((state) => state.family.loading || "");
  const ethnicity = useSelector((state) => state.nation.ethnicity) || [];
  const religions = useSelector((state) => state.religion.religions) || [];
  const category = useSelector((state) => state.family.categoryFamily);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(categoryFamily());
  }, [dispatch]);
  const onSubmit = async (data) => {
    // Thay đổi logic để xử lý thông tin thành viên gia đình
    await dispatch(addFamily(data));
    onClose(); // Close the modal after successful submission
  };

  return (
    <>
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
            Thêm thông tin gia đình
          </Typography>
          <Box
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
            onClick={onClose}
          >
            <IconButton
              sx={{
                backgroundColor: "#ff00001f",
              }}
            >
              <ClearOutlined
                sx={{
                  color: "red",
                }}
              />
            </IconButton>
          </Box>
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
                  label="Mối quan hệ"
                  {...register("idquanHe")}
                  fullWidth
                  defaultValue="0"
                  sx={selectStyles}
                >
                  <MenuItem value="0">
                    <em>Chọn quan hệ</em>
                  </MenuItem>
                  {category?.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.tenQuanHe}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} lg={7}>
                {" "}
                <TextField
                  label="Họ tên"
                  {...register("hoTen", {
                    required: "Họ tên là bắt buộc",
                  })}
                  error={!!errors.hoTen}
                  helperText={errors.hoTen?.message}
                  fullWidth
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={6} lg={4}>
                <TextField
                  label="Năm sinh"
                  type={"number"}
                  {...register("namSinh", {
                    required: "Năm sinh là bắt buộc",
                  })}
                  error={!!errors.namSinh}
                  helperText={errors.namSinh?.message}
                  fullWidth
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={6} lg={4}>
                <TextField
                  label="Quốc tịch"
                  {...register("quocTich")}
                  fullWidth
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={6} lg={4}>
                <Select
                  label="Dân tộc"
                  {...register("iddanToc")}
                  fullWidth
                  defaultValue="0"
                  sx={selectStyles}
                >
                  <MenuItem value="0">
                    <em>Chọn dân tộc</em>
                  </MenuItem>
                  {nations?.map((nation) => (
                    <MenuItem key={nation.id} value={nation.id}>
                      {nation.tenDanToc}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6} lg={4}>
                {" "}
                <Select
                  label="Tôn giáo"
                  {...register("idtonGiao")}
                  fullWidth
                  defaultValue="0"
                  sx={selectStyles}
                >
                  <MenuItem value="0">
                    <em>Chọn tôn giáo</em>
                  </MenuItem>
                  {religions?.map((religion) => (
                    <MenuItem key={religion.id} value={religion.id}>
                      {religion.tenTonGiao}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Nghề nghiệp"
                  {...register("ngheNghiep")}
                  fullWidth
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Số điện thoại"
                  type={"tel"}
                  {...register("soDienThoai", {
                    required: "Số điện thoại là bắt buộc",
                  })}
                  error={!!errors.soDienThoai}
                  helperText={errors.soDienThoai?.message}
                  fullWidth
                  sx={inputStyles}
                />
              </Grid>
            </Grid>

            <TextField
              label="Địa chỉ hộ khẩu"
              {...register("hoKhau")}
              fullWidth
              sx={inputStyles}
            />
            <TextField
              label="Địa chỉ hiện tại"
              {...register("hienNay")}
              fullWidth
              sx={inputStyles}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                Lưu
              </Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddFamily;
