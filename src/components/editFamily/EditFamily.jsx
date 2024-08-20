/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updateFamily,
  categoryFamily,
} from "../../features/familySlice/FamilySlice";
import Spinner from "../Spinner/Spinner";
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
    color: "#333333",
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

const EditFamily = ({ open, onClose, editData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.family.loading || "");
  const nations = useSelector((state) => state.nation.nations) || [];
  const religions = useSelector((state) => state.religion.religions) || [];
  const category = useSelector((state) => state.family.categoryFamily);

  useEffect(() => {
    dispatch(categoryFamily());
  }, [dispatch]);

  useEffect(() => {
    if (editData) {
      // Nếu có dữ liệu chỉnh sửa, đặt giá trị cho các trường dữ liệu
      Object.keys(editData).forEach((field) => {
        setValue(field, editData[field]);
      });
    } else {
      reset(); // Đặt lại form nếu không có dữ liệu chỉnh sửa
    }
  }, [editData, setValue, reset]);
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Cập nhật thông tin gia đình
      await dispatch(updateFamily({ formData: data, id: editData.id }));
      toast.success("Thông tin đã được lưu!");
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
      onClose(); // Đóng modal sau khi hoàn thành
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
              width: { xs: "80%", lg: "500px" },
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                marginBottom: "20px",
                color: "black",
                fontWeight: "600",
                fontSize: { xs: "15px", lg: "20px" },
              }}
            >
              Chỉnh sửa thông tin gia đình
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
              <Grid container spacing={{ xs: 2, lg: "3" }}>
                <Grid item xs={12} lg={5}>
                  <Select
                    label="Mối quan hệ"
                    {...register("idquanHe")}
                    fullWidth
                    defaultValue={editData ? editData.idquanHe : "0"}
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
                    defaultValue={editData?.iddanToc}
                    sx={selectStyles}
                  >
                    <MenuItem value="0">
                      <em>Chọn dân tộc</em>
                    </MenuItem>
                    {nations.map((nation) => (
                      <MenuItem key={nation.id} value={nation.id}>
                        {nation.tenDanToc}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6} lg={4}>
                  <Select
                    label="Tôn giáo"
                    {...register("idtonGiao")}
                    fullWidth
                    defaultValue={editData?.idtonGiao}
                    sx={selectStyles}
                  >
                    <MenuItem value="0">
                      <em>Chọn tôn giáo</em>
                    </MenuItem>
                    {religions.map((religion) => (
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
                  {isSubmitting ? "Đang lưu..." : "Lưu"}
                </Typography>{" "}
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default EditFamily;
