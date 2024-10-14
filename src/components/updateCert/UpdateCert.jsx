import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateChungChi } from "../../features/graduationSlice/GraduationSlice";

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
};

const UpdateCert = ({ open, onClose, idCertUpdate, semester }) => {
  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    ngayCap: "",
    nguoiCap: "",
    soHieu: "",
    soVaoSo: "",
    noiCap: "",
    soSeri: "",
  });

  // State quản lý file chứng chỉ riêng biệt
  const [fileChungChi, setFileChungChi] = useState(null);

  // Reset lại form khi popup được mở
  useEffect(() => {
    if (open) {
      setFormData({
        ngayCap: "",
        nguoiCap: "",
        soHieu: "",
        soVaoSo: "",
        noiCap: "",
        soSeri: "",
      });
      setFileChungChi(null); // Reset file chứng chỉ
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFileChungChi(files[0]); // Lưu file chứng chỉ vào state riêng
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const dispatch = useDispatch();
  const handleSave = () => {
    if (!fileChungChi) {
      alert("File chứng chỉ là bắt buộc");
      return;
    }

    const jsonPayload = JSON.stringify({
      ngayCap: formData.ngayCap,
      nguoiCap: formData.nguoiCap,
      soHieu: formData.soHieu,
      soVaoSo: formData.soVaoSo,
      noiCap: formData.noiCap,
      soSeri: formData.soSeri,
    });

    const formDataToSubmit = new FormData();
    formDataToSubmit.append(
      "chungChi",
      new Blob([jsonPayload], { type: "application/json" })
    );
    formDataToSubmit.append("minhChung", fileChungChi);

    // Gửi dữ liệu lên server qua redux
    dispatch(
      updateChungChi({ idCertUpdate, formData: formDataToSubmit, semester })
    );

    onClose(); // Đóng popup sau khi lưu
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
          Cập nhật chứng chỉ
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Grid container spacing={{ xs: 2, lg: 3 }}>
            {/* <Grid item xs={12} lg={5}>
              <Select
                name="chuanDauRa"
                value={formData.chuanDauRa}
                onChange={handleChange}
                fullWidth
                sx={inputStyles}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Chọn chứng chỉ đầu ra tương ứng</em>
                </MenuItem>
                {chungChiList?.map((c) => (
                  <MenuItem key={c.idChungChi} value={c.idChungChi}>
                    {c.tenChungChi}
                  </MenuItem>
                ))}
              </Select>
            </Grid> */}
            <Grid item xs={12} lg={7}>
              <TextField
                label="Ngày cấp"
                name="ngayCap"
                value={formData.ngayCap}
                onChange={handleChange}
                fullWidth
                sx={inputStyles}
              />
            </Grid>
          </Grid>
          <TextField
            label="Người cấp"
            name="nguoiCap"
            value={formData.nguoiCap}
            onChange={handleChange}
            fullWidth
            sx={inputStyles}
          />
          <TextField
            label="Số hiệu"
            name="soHieu"
            value={formData.soHieu}
            onChange={handleChange}
            fullWidth
            sx={inputStyles}
          />
          <TextField
            label="Số vào sổ"
            name="soVaoSo"
            value={formData.soVaoSo}
            onChange={handleChange}
            fullWidth
            sx={inputStyles}
          />
          <TextField
            label="Nơi cấp"
            name="noiCap"
            value={formData.noiCap}
            onChange={handleChange}
            fullWidth
            sx={inputStyles}
          />
          <TextField
            label="Số seri"
            name="soSeri"
            value={formData.soSeri}
            onChange={handleChange}
            fullWidth
            sx={inputStyles}
          />

          {/* Phần hiển thị file đã chọn */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              label="File chứng chỉ"
              type="file"
              name="fileChungChi"
              inputProps={{ accept: "image/*" }}
              onChange={handleChange}
              fullWidth
              sx={inputStyles}
            />
            {formData.fileChungChi && (
              <Typography variant="body2" color="textSecondary">
                {formData.fileChungChi.name}
              </Typography> /* Hiển thị tên file đã chọn */
            )}
          </Box>

          <Button
            onClick={handleSave}
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

export default UpdateCert;
