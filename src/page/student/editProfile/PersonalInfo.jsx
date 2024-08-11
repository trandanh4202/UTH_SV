/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getNation } from "~/features/nationSlice/NationSlice";
import { getReligion } from "~/features/religionSlice/ReligionSlice";
import useDebounce from "../../../components/hooks/UseDebounce";
import { getDistrict } from "../../../features/districtSlice/DistrictSlice";
import { getProvince } from "../../../features/provinceSlice/ProvinceSlice";
import { getWard } from "../../../features/wardSlice/WardSlice";
import { updateProfile } from "../../../features/profileSlice/ProfileSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
const SelectField = ({
  name,
  value,
  onChange,
  disabled,
  options,
  label,
  optionType,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
      {label}
    </Typography>
    <Select
      name={name}
      value={value}
      onChange={onChange}
      displayEmpty
      disabled={disabled}
      sx={selectStyles}
    >
      <MenuItem value="">
        <em>Chọn {label}</em>
      </MenuItem>
      {options &&
        options.map((option) => (
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
              : option.name}
          </MenuItem>
        ))}
    </Select>
  </Box>
);

// Component TextFieldWrapper
const TextFieldWrapper = ({ name, value, onChange, label, type = "text" }) => {
  // Xử lý thay đổi giá trị cho trường hợp loại ngày tháng
  const handleChange = (event) => {
    onChange({ target: { name, value: event.target.value } });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
        {label}
      </Typography>
      <TextField
        name={name}
        value={value}
        onChange={handleChange}
        type={type}
        sx={{ ...inputStyles, width: "100%" }} // Adjust `inputStyles` as needed
      />
    </Box>
  );
};

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const ethnicity = useSelector((state) => state.nation.nations) || [];
  const religions = useSelector((state) => state.religion.religions) || [];

  const [formData, setFormData] = useState({
    hoDem: "",
    ten: "",
    gioiTinh: true,
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
    schoolEmail: "",
    iddanToc: 0,
    idtonGiao: 0,
    idtinh: 0,
    idhuyen: 0,
    idphuongXa: 0,
    idtinhCapCMND: 0,
  });
  const debouncedFormData = useDebounce(formData, 500);
  console.log(debouncedFormData);
  const [provinces, setProvinces] = useState([]);
  const [districtsByLocation, setDistrictsByLocation] = useState({
    queQuan: [],
    noiSinh: [],
    hktt: [],
    dcll: [],
  });
  const [wardsByLocation, setWardsByLocation] = useState({
    queQuan: [],
    noiSinh: [],
    hktt: [],
    dcll: [],
  });

  useEffect(() => {
    dispatch(getNation());
    dispatch(getReligion());
    dispatch(getProvince()).then((action) => {
      setProvinces(action.payload);
    });
  }, [dispatch]);

  // Handle changes for the "Quê quán" fields
  useEffect(() => {
    if (formData.idtinh) {
      dispatch(getDistrict(formData.idtinh)).then((action) => {
        setDistrictsByLocation((prev) => ({
          ...prev,
          queQuan: action.payload,
        }));
        // Chỉ cập nhật nếu giá trị thực sự thay đổi
        if (formData.idhuyen !== 0 || formData.idphuongxa !== 0) {
          setFormData((prev) => ({
            ...prev,
            idhuyen: 0,
            idphuongxa: 0,
          }));
        }
      });
    }
  }, [dispatch, formData.idtinh]);

  useEffect(() => {
    if (formData.idhuyen) {
      dispatch(getWard(formData.idhuyen)).then((action) => {
        setWardsByLocation((prev) => ({
          ...prev,
          queQuan: action.payload,
        }));
        setFormData((prev) => ({
          ...prev,
          idphuongxa: 0,
        }));
      });
    }
  }, [dispatch, formData.idhuyen]);

  // Handle changes for the "Nơi sinh" fields
  useEffect(() => {
    if (formData.noiSinh) {
      dispatch(getDistrict(formData.noiSinh)).then((action) => {
        setDistrictsByLocation((prev) => ({
          ...prev,
          noiSinh: action.payload,
        }));
        setFormData((prev) => ({
          ...prev,
          noisinhIdhuyen: 0,
          noisinhIdphuongxa: 0,
        }));
      });
    }
  }, [dispatch, formData.noiSinh]);

  useEffect(() => {
    if (formData.noisinhIdhuyen) {
      dispatch(getWard(formData.noisinhIdhuyen)).then((action) => {
        setWardsByLocation((prev) => ({
          ...prev,
          noiSinh: action.payload,
        }));
        setFormData((prev) => ({
          ...prev,
          noisinhIdphuongxa: 0,
        }));
      });
    }
  }, [dispatch, formData.noisinhIdhuyen]);

  // Handle changes for the "Hộ khẩu thường trú" fields
  useEffect(() => {
    if (formData.hkttIdtinh) {
      dispatch(getDistrict(formData.hkttIdtinh)).then((action) => {
        setDistrictsByLocation((prev) => ({
          ...prev,
          hktt: action.payload,
        }));
        setFormData((prev) => ({
          ...prev,
          hkttIdhuyen: 0,
          hkttIdphuongxa: 0,
        }));
      });
    }
  }, [dispatch, formData.hkttIdtinh]);

  useEffect(() => {
    if (formData.hkttIdhuyen) {
      dispatch(getWard(formData.hkttIdhuyen)).then((action) => {
        setWardsByLocation((prev) => ({
          ...prev,
          hktt: action.payload,
        }));
        setFormData((prev) => ({
          ...prev,
          hkttIdphuongxa: 0,
        }));
      });
    }
  }, [dispatch, formData.hkttIdhuyen]);
  // Handle changes for the "Địa chỉ liên lạc" fields
  useEffect(() => {
    if (formData.dcllIdtinh) {
      dispatch(getDistrict(formData.dcllIdtinh)).then((action) => {
        setDistrictsByLocation((prev) => ({
          ...prev,
          dcll: action.payload,
        }));
        setFormData((prev) => ({
          ...prev,
          dcllIdhuyen: 0,
          dcllIdphuongxa: 0,
        }));
      });
    }
  }, [dispatch, formData.dcllIdtinh]);

  useEffect(() => {
    if (formData.dcllIdhuyen) {
      dispatch(getWard(formData.dcllIdhuyen)).then((action) => {
        setWardsByLocation((prev) => ({
          ...prev,
          dcll: action.payload,
        }));
        setFormData((prev) => ({
          ...prev,
          dcllIdphuongxa: 0,
        }));
      });
    }
  }, [dispatch, formData.dcllIdhuyen]);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData)); // Dispatch the updateProfile action with formData
    setIsUpdateProfile(true);
  };
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);
  const message = useSelector((state) => state.profile.updateProfile?.message);
  const status = useSelector((state) => state.profile.updateProfile?.status);

  useEffect(() => {
    if (isUpdateProfile && message) {
      if (status === 200) {
        toast.success(message);

        setTimeout(() => {
          window.location.reload(); // Thay đổi từ window.locatiion.clear() thành window.location.reload()
        }, 2000);
      } else if (status === 400) {
        toast.error(message);
      }
      setIsUpdateProfile(false);
    }
  }, [isUpdateProfile, message, status]);
  return (
    <>
      <Box>
        <Box sx={{ padding: "10px 20px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={3}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <TextFieldWrapper
                    name="hoDem"
                    value={formData.hoDem}
                    onChange={handleChange}
                    label="Họ đệm"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={1.5}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <TextFieldWrapper
                    name="ten"
                    value={formData.ten}
                    onChange={handleChange}
                    label="Tên"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={1.5}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Giới tính
                  </Typography>
                  <Select
                    name="gioiTinh"
                    value={formData.gioiTinh}
                    onChange={handleChange}
                    displayEmpty
                    sx={selectStyles}
                  >
                    <MenuItem value="0">
                      <em>Chọn giới tính</em>
                    </MenuItem>
                    <MenuItem value="false">Nam</MenuItem>
                    <MenuItem value="true">Nữ</MenuItem>
                    {/* <MenuItem value="other">Khác</MenuItem> */}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} lg={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <TextFieldWrapper
                    name="ngaySinh2"
                    value={formData.ngaySinh2} // Ensure this is in 'YYYY-MM-DD' format
                    onChange={handleChange}
                    label="Ngày sinh"
                    type="date"
                    id="date-picker"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2}>
                <SelectField
                  name="iddanToc"
                  value={formData.iddanToc}
                  onChange={handleChange}
                  options={ethnicity}
                  label="Dân tộc"
                  optionType="danToc"
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <SelectField
                  name="idtonGiao"
                  value={formData.idtonGiao}
                  onChange={handleChange}
                  options={religions}
                  label="Tôn giáo"
                  optionType="tonGiao"
                />
              </Grid>
              <Grid item xs={12} lg={2.5}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <SelectField
                    name="idtinh"
                    value={formData.idtinh || ""}
                    onChange={handleChange}
                    options={provinces}
                    label="Quê quán Tỉnh (CCCD)"
                    optionType="province"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} lg={2.5}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <SelectField
                    name="idhuyen"
                    value={formData.idhuyen || ""}
                    onChange={handleChange}
                    disabled={!formData.idtinh}
                    options={districtsByLocation.queQuan}
                    label="Quê quán Huyện"
                    optionType="district"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} lg={2.5}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <SelectField
                    name="idphuongxa"
                    value={formData.idphuongxa || ""}
                    onChange={handleChange}
                    disabled={!formData.idhuyen}
                    options={wardsByLocation.queQuan}
                    label="Quê quán Huyện"
                    optionType="ward"
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
        onChange={handleChange}
        sx={inputStyles}
      />
    </Box> */}
              </Grid>
              <Grid item xs={12} lg={2.5}>
                <SelectField
                  name="noiSinh"
                  value={formData.noiSinh || ""}
                  onChange={handleChange}
                  options={provinces}
                  label="Nơi sinh Tỉnh"
                  optionType="province"
                />
              </Grid>

              <Grid item xs={12} lg={2.5}>
                <SelectField
                  name="noisinhIdhuyen"
                  value={formData.noisinhIdhuyen || ""}
                  onChange={handleChange}
                  disabled={!formData.noiSinh}
                  options={districtsByLocation.noiSinh}
                  label="Nơi sinh Huyện"
                  optionType="district"
                />
              </Grid>

              <Grid item xs={12} lg={2.5}>
                <SelectField
                  name="noisinhIdphuongxa"
                  value={formData.noisinhIdphuongxa || ""}
                  onChange={handleChange}
                  disabled={!formData.noisinhIdhuyen}
                  options={wardsByLocation.noiSinh}
                  label="Nơi sinh Phường/ xã"
                  optionType="ward"
                />
              </Grid>
              <Grid item xs={12} lg={4.5}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Nguyên quán
                  </Typography>
                  <TextField
                    name="nguyenQuan"
                    value={formData.nguyenQuan || ""}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2.5}>
                <SelectField
                  name="hkttIdtinh"
                  value={formData.hkttIdtinh || ""}
                  onChange={handleChange}
                  options={provinces}
                  label="Hộ khẩu thường trú Tỉnh"
                  optionType="province"
                />
              </Grid>
              <Grid item xs={12} lg={2.5}>
                <SelectField
                  name="hkttIdhuyen"
                  value={formData.hkttIdhuyen || ""}
                  onChange={handleChange}
                  disabled={!formData.hkttIdtinh}
                  options={districtsByLocation.hktt}
                  label="HKTT Huyện"
                  optionType="district"
                />
              </Grid>

              <Grid item xs={12} lg={2.5}>
                <SelectField
                  name="hkttIdphuongxa"
                  value={formData.hkttIdphuongxa || ""}
                  onChange={handleChange}
                  disabled={!formData.hkttIdhuyen}
                  options={wardsByLocation.hktt}
                  label="HKTT Phường/ xã"
                  optionType="ward"
                />
              </Grid>
              <Grid item xs={12} lg={4.5}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Hộ khẩu thường trú cụ thể
                  </Typography>
                  <TextField
                    name="hkttThonxom"
                    value={formData.hkttThonxom || ""}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2.5}>
                <SelectField
                  name="dcllIdtinh"
                  value={formData.dcllIdtinh || ""}
                  onChange={handleChange}
                  options={provinces}
                  label="Địa chỉ liên lạc Tỉnh"
                  optionType="province"
                />
              </Grid>
              <Grid item xs={12} lg={2.5}>
                <SelectField
                  name="dcllIdhuyen"
                  value={formData.dcllIdhuyen || ""}
                  onChange={handleChange}
                  disabled={!formData.dcllIdtinh}
                  options={districtsByLocation.dcll}
                  label="ĐCLL Huyện"
                  optionType="district"
                />
              </Grid>
              <Grid item xs={12} lg={2.5}>
                <SelectField
                  name="dcllIdphuongxa"
                  value={formData.dcllIdphuongxa || ""}
                  onChange={handleChange}
                  disabled={!formData.dcllIdhuyen}
                  options={wardsByLocation.dcll}
                  label="ĐCLL Phường/ xã"
                  optionType="ward"
                />
              </Grid>
              <Grid item xs={12} lg={4.5}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Địa chỉ liên lạc cụ thể
                  </Typography>
                  <TextField
                    name="dcllSonha"
                    value={formData.dcllSonha || ""}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Căn cước công dân
                  </Typography>
                  <TextField
                    name="soCMND"
                    value={formData.soCMND || ""}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} lg={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Ngày cấp
                  </Typography>
                  <TextField
                    name="ngayCap"
                    type="date"
                    value={formData.ngayCap || ""}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2}>
                <SelectField
                  name="tinhCapCMND"
                  value={formData.tinhCapCMND || ""}
                  onChange={handleChange}
                  options={provinces}
                  label="Tỉnh cấp"
                  optionType="province"
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Quốc tịch
                  </Typography>
                  <TextField
                    name="quocTich"
                    value={formData.nation}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Ngày vào Đảng
                  </Typography>
                  <TextField
                    name="ngayVaoDang"
                    type="date"
                    value={formData.ngayVaoDang}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Ngày vào Đoàn
                  </Typography>
                  <TextField
                    name="ngayVaoDoan"
                    type="date"
                    value={formData.ngayVaoDoan}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Email cá nhân
                  </Typography>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Email sinh viên
                  </Typography>
                  <TextField
                    name="schoolEmail"
                    value={formData.schoolEmail}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Số điện thoại 1
                  </Typography>
                  <TextField
                    name="soDienThoai"
                    value={formData.soDienThoai}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Số điện thoại 2
                  </Typography>
                  <TextField
                    name="soDienThoai2"
                    value={formData.soDienThoai2}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Chiều cao (cm)
                  </Typography>
                  <TextField
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Căn nặng (kg)
                  </Typography>
                  <TextField
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    sx={inputStyles}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Mã Bảo hiểm xã hội
                  </Typography>
                  <TextField
                    name="mabhxhYt"
                    value={formData.mabhxhYt}
                    onChange={handleChange}
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
    </>
  );
};

export default PersonalInfo;
