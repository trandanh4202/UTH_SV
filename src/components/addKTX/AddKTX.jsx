/* eslint-disable react/prop-types */
import {
  Box,
  CircularProgress,
  Modal,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { categoryFamily } from "../../features/familySlice/FamilySlice";
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

const AddKTX = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile || "");
  const loading = useSelector((state) => state.family.loading || "");
  const [mongMuonGiaCanh, setMongMuonGiaCanh] = useState(
    profile.mongMuonGiaCanh || ""
  );

  useEffect(() => {
    dispatch(categoryFamily());
  }, [dispatch]);

  const handleChange = (e) => {
    setMongMuonGiaCanh(e.target.value);
  };

  const handleSave = () => {
    // dispatch(updateProfile({ ...profile, mongMuonGiaCanh }));
    onClose();
  };
  return (
    <>
      {loading ? (
        <CircularProgress />
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
              Thông tin sinh viên
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Grid container spacing={{ xs: 2, lg: 3 }}>
                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Họ và tên"
                    value={profile.hoTen || ""}
                    fullWidth
                    InputProps={{
                      disabled: true,
                    }}
                    sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={6} lg={4}>
                  <TextField
                    label="Năm sinh"
                    value={profile.namSinh || "1"}
                    fullWidth
                    InputProps={{
                      disabled: true,
                    }}
                    sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={6} lg={4}>
                  <TextField
                    label="Quốc tịch"
                    value={profile.quocTich || ""}
                    fullWidth
                    InputProps={{
                      disabled: true,
                    }}
                    sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={6} lg={4}>
                  <TextField
                    label="Dân tộc"
                    value={profile.danToc || ""}
                    fullWidth
                    InputProps={{
                      disabled: true,
                    }}
                    readOnly
                    sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={6} lg={4}>
                  <TextField
                    label="Tôn giáo"
                    value={profile.tonGiao || ""}
                    fullWidth
                    InputProps={{
                      disabled: true,
                    }}
                    readOnly
                    sx={inputStyles}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Khu vực ưu tiên"
                    value={profile.KhuVuc || ""}
                    fullWidth
                    InputProps={{
                      disabled: true,
                    }}
                    readOnly
                    sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Đối tượng ưu tiên"
                    value={profile.DoiTuong || ""}
                    fullWidth
                    InputProps={{
                      disabled: true,
                    }}
                    readOnly
                    sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Địa chỉ thường trú"
                    value={profile.DiaChiThuongTru || ""}
                    fullWidth
                    InputProps={{
                      disabled: true,
                    }}
                    readOnly
                    sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Số điện thoại"
                    value={profile.soDienThoai || ""}
                    fullWidth
                    InputProps={{
                      disabled: true,
                    }}
                    readOnly
                    sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    label="Email"
                    value={profile.email || ""}
                    fullWidth
                    InputProps={{
                      disabled: true,
                    }}
                    readOnly
                    sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    label="Trình bày mong muốn, gia cảnh"
                    value={mongMuonGiaCanh}
                    onChange={handleChange}
                    fullWidth
                    sx={inputStyles}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Button
                onClick={onClose}
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
                  "&:hover": {
                    borderColor: "#008689",
                    backgroundColor: "white",
                    color: "#008689",
                    boxShadow: "0 0 10px #008689",
                  },
                }}
              >
                Đăng ký KTX
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AddKTX;
