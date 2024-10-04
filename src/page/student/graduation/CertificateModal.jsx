import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const CertificateModal = ({ open, handleClose, handleSubmit }) => {
  const [certificates, setCertificates] = useState([
    {
      idchungchi: "",
      ngayCap: "",
      nguoiCap: "",
      soHieu: "",
      soVaoSo: "",
      noiCap: "",
      soSeri: "",
      fileChungChi: null,
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newCertificates = [...certificates];
    newCertificates[index] = {
      ...newCertificates[index],
      [name]: value,
    };
    setCertificates(newCertificates);
  };

  const handleFileChange = (index, e) => {
    const { name } = e.target;
    const newCertificates = [...certificates];
    newCertificates[index] = {
      ...newCertificates[index],
      [name]: e.target.files[0],
    };
    setCertificates(newCertificates);
  };

  const addCertificate = () => {
    setCertificates([
      ...certificates,
      {
        idchungchi: "",
        ngayCap: "",
        nguoiCap: "",
        soHieu: "",
        soVaoSo: "",
        noiCap: "",
        soSeri: "",
        fileChungChi: null,
      },
    ]);
  };

  const handleModalSubmit = () => {
    // handleSubmit(certificates);
    // handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, p: 4, bgcolor: "background.paper", m: "auto" }}>
        <Typography variant="h6">Nhập thông tin chứng chỉ</Typography>
        {certificates.map((certificate, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Chứng chỉ {index + 1}</Typography>
            <TextField
              fullWidth
              label="ID Chứng chỉ"
              name="idchungchi"
              value={certificate.idchungchi}
              onChange={(e) => handleChange(index, e)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Ngày cấp"
              name="ngayCap"
              type="date"
              value={certificate.ngayCap}
              onChange={(e) => handleChange(index, e)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Người cấp"
              name="nguoiCap"
              value={certificate.nguoiCap}
              onChange={(e) => handleChange(index, e)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Số hiệu"
              name="soHieu"
              value={certificate.soHieu}
              onChange={(e) => handleChange(index, e)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Số vào sổ"
              name="soVaoSo"
              value={certificate.soVaoSo}
              onChange={(e) => handleChange(index, e)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Nơi cấp"
              name="noiCap"
              value={certificate.noiCap}
              onChange={(e) => handleChange(index, e)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Số seri"
              name="soSeri"
              value={certificate.soSeri}
              onChange={(e) => handleChange(index, e)}
              margin="normal"
            />
            <input
              type="file"
              name="fileChungChi"
              onChange={(e) => handleFileChange(index, e)}
              accept="image/*"
              style={{ margin: "10px 0" }}
            />
          </Box>
        ))}
        <Button variant="outlined" onClick={addCertificate} sx={{ mb: 2 }}>
          Thêm chứng chỉ
        </Button>
        <Button variant="contained" onClick={handleModalSubmit}>
          NHẬP
        </Button>
      </Box>
    </Modal>
  );
};

export default CertificateModal;
