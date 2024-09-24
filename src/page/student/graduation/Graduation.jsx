/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const inputStyles = {
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
    padding: "9px 14px",

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
    transition: "all ease 0.4s",
    padding: "9px 14px",
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

const SelectField = ({
  name,
  value,
  onChange,
  disabled,
  options,
  label,
  optionType,
  successAccess,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
      {label}
    </Typography>
    <Select
      name={name}
      value={value !== undefined ? value : ""} // Đảm bảo giá trị false không bị hiểu là rỗng
      onChange={onChange}
      displayEmpty
      disabled={!successAccess ? !successAccess : disabled}
      sx={selectStyles}
    >
      <MenuItem value="">
        <em>Chọn {label}</em>
      </MenuItem>
      {options &&
        options?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {optionType === "province"
              ? option.tenTinh
              : optionType === "district"
              ? option.tenHuyen
              : optionType === "ward"
              ? option.tenPhuongXa
              : optionType === "danToc"
              ? option.tenDanToc
              : optionType === "tonGiao"
              ? option.tenTonGiao
              : optionType === "quocTich"
              ? option.tenQuocGia
              : optionType === "hospital"
              ? option.name + ` - Mã KCB BĐ ` + option.code
              : option.name}
          </MenuItem>
        ))}
    </Select>
  </Box>
);
const SelectFieldString = ({
  name,
  value,
  onChange,
  disabled,
  options,
  label,
  successAccess,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
      {label}
    </Typography>
    <Select
      name={name}
      value={value !== undefined ? value : ""} // Đảm bảo giá trị false không bị hiểu là rỗng
      onChange={onChange}
      displayEmpty
      disabled={!successAccess ? !successAccess : disabled}
      sx={selectStyles}
    >
      <MenuItem value="">
        <em>Chọn {label}</em>
      </MenuItem>
      {options &&
        options?.map((option) => (
          <MenuItem key={option.tenQuocGia} value={option.tenQuocGia}>
            {option.tenQuocGia}
          </MenuItem>
        ))}
    </Select>
  </Box>
);

// Component TextFieldWrapper
const TextFieldWrapper = ({
  name,
  value,
  onChange,
  label,
  type = "text",
  successAccess,
  placeholder,
}) => {
  // Xử lý thay đổi giá trị cho trường hợp loại ngày tháng

  const handleChange = (event) => {
    const newValue = event.target.value;

    // if (name === "schoolEmail" && !newValue.endsWith("@ut.edu.vn")) {
    //   alert("Email phải là @ut.edu.vn");
    //   return;
    // }
    onChange({ target: { name, value: newValue } });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
        {label}
      </Typography>
      <TextField
        name={name}
        value={value}
        // onChange={handleChange}
        type={type}
        disabled={!successAccess}
        placeholder={placeholder}
        sx={{ ...inputStyles, width: "100%" }} // Adjust `inputStyles` as needed
      />
    </Box>
  );
};

const Graduation = () => {
  const dispatch = useDispatch();
  const ethnicity = useSelector((state) => state.nation.ethnicity) || [];
  const religions = useSelector((state) => state.religion.religions) || [];
  const nations = useSelector((state) => state.nation.nations) || [];
  const hospital =
    useSelector((state) => state.hospital.getHospital?.body) || [];

  const genders = [
    {
      id: false,
      name: "Nam",
    },
    {
      id: true,
      name: "Nữ",
    },
  ];
  const [formData, setFormData] = useState({
    hoDem: "",
    ten: "",
    gioiTinh: "",
    ngaySinh2: "",
    noiSinh: 0,
    noisinhIdhuyen: 0,
    noisinhIdphuongxa: 0,
    soCMND: "",
    ngayCap: "",
    email: "",
    soDienThoai: "",
    soDienThoai2: "",
    quocTich: "",
    mabhxhYt: "",
    hospitalId: null,
    nguyenQuan: "",
    hkttIdhuyen: 0,
    hkttIdtinh: 0,
    hkttIdphuongxa: 0,
    hkttThonxom: "",
    dcllIdtinh: 0,
    dcllIdhuyen: 0,
    dcllIdphuongxa: 0,
    dcllSonha: "",
    ngayVaoDoan: "",
    ngayVaoDang: "",
    height: 0,
    weight: 0,
    // schoolEmail: "",
    iddanToc: 0,
    idtonGiao: 0,
    idtinh: 0,
    idhuyen: 0,
    idphuongXa: 0,
    idtinhCapCMND: 0,
  });
  // const note = useSelector((state) => state.notification?.getNote.body || []);
  const note = [];
  const profile = useSelector((state) => state.profile.summaryProfile?.body);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData)); // Dispatch the updateProfile action with formData
    setUpdate(true);
  };
  const successAccess = false;
  return (
    <Container>
      <Paper
        elevation={14}
        sx={{
          borderRadius: "10px",
          padding: { xs: "5px", lg: "20px" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            margin: "15px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Divider
              orientation="vertical"
              sx={{
                color: "red",
                border: "3px solid",
                height: "20px",
                marginRight: "5px",
              }}
            />
            <Typography
              sx={{ color: "#008588", fontWeight: "700", fontSize: "16px" }}
            >
              Phiếu đề xuất xét tốt nghiệp
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ padding: "10px 20px" }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12} lg={3}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <TextFieldWrapper
                      name="hoDem"
                      value={formData.hoDem}
                      // onChange={handleChange}
                      label="Họ đệm"
                      successAccess={successAccess}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={1.5}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <TextFieldWrapper
                      name="ten"
                      value={formData.ten}
                      // onChange={handleChange}
                      successAccess={successAccess}
                      label="Tên"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={1.5}>
                  <SelectField
                    label="Giới tính"
                    name="gioiTinh"
                    value={formData.gioiTinh}
                    // onChange={handleChange}
                    successAccess={successAccess}
                    sx={selectStyles}
                    options={genders}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <TextFieldWrapper
                      name="ngaySinh2"
                      value={formData.ngaySinh2} // Ensure this is in 'YYYY-MM-DD' format
                      // onChange={handleChange}
                      label="Ngày sinh"
                      // type="date"
                      placeholder="Ví dụ: 04/02/2006"
                      successAccess={successAccess}
                      id="date-picker"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={2}>
                  <SelectField
                    name="iddanToc"
                    value={formData.iddanToc}
                    // onChange={handleChange}
                    options={ethnicity}
                    label="Dân tộc"
                    optionType="danToc"
                    successAccess={successAccess}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <SelectField
                    name="idtonGiao"
                    value={formData.idtonGiao}
                    // onChange={handleChange}
                    options={religions}
                    label="Tôn giáo"
                    successAccess={successAccess}
                    optionType="tonGiao"
                  />
                </Grid>
                <Grid item xs={12} lg={2.5}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <SelectField
                      name="idtinh"
                      value={formData.idtinh || ""}
                      // onChange={handleChange}
                      // options={provinces}
                      label="Quê quán Tỉnh (CCCD)"
                      successAccess={successAccess}
                      optionType="province"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} lg={4.5}>
                  {/* <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
        Quê quán cụ thể
      </Typography>
      <TextField
        name="detailAddressBD"
        value={formData.detailAddressBD}
        // onChange={handleChange}
        sx={inputStyles}
      />
    </Box> */}
                </Grid>
                <Grid item xs={12} lg={2.5}>
                  <SelectField
                    name="noiSinh"
                    value={formData.noiSinh || ""}
                    // onChange={handleChange}
                    // options={provinces}
                    label="Nơi sinh Tỉnh"
                    successAccess={successAccess}
                    optionType="province"
                  />
                </Grid>

                <Grid item xs={12} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Căn cước công dân
                    </Typography>
                    <TextFieldWrapper
                      name="soCMND"
                      value={formData.soCMND || ""}
                      // onChange={handleChange}
                      successAccess={successAccess}
                      sx={inputStyles}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <SelectFieldString
                      name="quocTich"
                      value={formData.quocTich || ""}
                      // onChange={handleChange}
                      options={nations}
                      label="Quốc tịch"
                      successAccess={successAccess}
                      optionType="quocTich"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Email cá nhân
                    </Typography>
                    <TextFieldWrapper
                      name="email"
                      value={formData.email}
                      // onChange={handleChange}
                      successAccess={successAccess}
                      sx={inputStyles}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Email sinh viên
                    </Typography>
                    <TextFieldWrapper
                      name="schoolEmail"
                      value={formData.schoolEmail}
                      // onChange={handleChange}
                      successAccess={!successAccess}
                      sx={inputStyles}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Số điện thoại 1
                    </Typography>
                    <TextFieldWrapper
                      name="soDienThoai"
                      value={formData.soDienThoai}
                      // onChange={handleChange}
                      successAccess={successAccess}
                      sx={inputStyles}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Số điện thoại 2
                    </Typography>
                    <TextFieldWrapper
                      name="soDienThoai2"
                      value={formData.soDienThoai2}
                      // onChange={handleChange}
                      successAccess={successAccess}
                      sx={inputStyles}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  marginTop: "20px",
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!successAccess}
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
                      bolghadow: "0 0 10px #008689",
                    },
                  }}
                >
                  CẬP NHẬT
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Graduation;
