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
    color: "black",
    borderRadius: "8px",
    border: "3px solid #0085885a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "9px 14px",
    transition: "all ease 0.4s",
  },
  "& .MuiSvgIcon-root": {
    color: "#0085885a",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0085885a",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0085885a",
  },
  "& .MuiSelect-select:focus": {
    borderRadius: "8px",
    borderColor: "#008588",
  },
};
const AddKTX = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile || "");
  const loading = useSelector((state) => state.family.loading || "");
  const [campus, setCampus] = useState("2");
  const [mongMuonGiaCanh, setMongMuonGiaCanh] = useState(
    profile.mongMuonGiaCanh || ""
  );

  useEffect(() => {
    dispatch(categoryFamily());
  }, [dispatch]);

  const campusChange = (e) => {
    setCampus(e.target.value);
  };

  const handleSave = () => {
    // dispatch(updateProfile({ ...profile, mongMuonGiaCanh }));
    onClose();
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (e) => {
    setMongMuonGiaCanh(e.target.value);
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
              Thông tin đăng ký KTX
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: "40px",
              }}
            >
              <Grid container spacing={{ xs: 2, lg: 3 }}>
                {/* <Grid item xs={12} lg={4}>
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
                </Grid> */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "5px",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#333333",
                      fontWeight: "700",
                      fontSize: {
                        xs: "11px",
                        lg: "16px",
                      },
                      textAlign: "center",
                    }}
                  >
                    Cơ sở nhận
                  </Typography>
                  <Select
                    value={campus}
                    onChange={campusChange}
                    displayEmpty
                    sx={selectStyles}
                  >
                    <MenuItem value="" disabled>
                      Chọn cơ sở
                    </MenuItem>

                    <MenuItem
                      key="2"
                      value="2"
                      index="1"
                      sx={{ fontSize: "13px" }}
                    >
                      Cơ sở 2
                    </MenuItem>
                    <MenuItem
                      key="3"
                      value="Cơ sở 3"
                      index="1"
                      sx={{ fontSize: "13px" }}
                    >
                      Cơ sở 3
                    </MenuItem>
                  </Select>
                </Box>

                <Grid item xs={12} lg={12}>
                  <TextField
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginBottom: "20px" }}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "& .MuiInputBase-input": {
                        fontSize: "15px",
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "8px",
                        border: "3px solid #0085885a",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "all ease 0.4s",

                        "&:hover": {
                          borderColor: "#008588",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "green",
                        backgroundSize: "cover",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    label="Trình bày mong muốn, gia cảnh"
                    value={mongMuonGiaCanh}
                    onChange={campusChange}
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
