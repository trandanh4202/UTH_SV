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
import {
  getProfile,
  getUpdateProfile,
  updateProfile,
} from "../../../features/profileSlice/ProfileSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parse, format } from "date-fns";

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
const validateOption = (value, options) => {
  return options.includes(value) ? value : "";
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
              : option.name}
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
}) => {
  // Xử lý thay đổi giá trị cho trường hợp loại ngày tháng

  const handleChange = (event) => {
    const newValue = event.target.value;

    if (name === "schoolEmail" && !newValue.endsWith("@ut.edu.vn")) {
      alert("Email phải là @ut.edu.vn");
      return;
    }
    console.log(name, newValue);
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
        onChange={handleChange}
        type={type}
        disabled={!successAccess}
        sx={{ ...inputStyles, width: "100%" }} // Adjust `inputStyles` as needed
      />
    </Box>
  );
};

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const ethnicity = useSelector((state) => state.nation.nations) || [];
  const religions = useSelector((state) => state.religion.religions) || [];
  useEffect(() => {
    dispatch(getNation());
    dispatch(getReligion());
    dispatch(getProvince()).then((action) => {
      setProvinces(action.payload);
    });
    dispatch(getUpdateProfile());
  }, [dispatch]);
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
  const profile = useSelector((state) => state.profile.getUpdateProfile?.body);
  const successUpdate = useSelector(
    (state) => state.profile.getUpdateProfile?.successUpdate
  );
  const messageUpdate = useSelector(
    (state) => state.profile.getUpdateProfile?.messageUpdate
  );
  useEffect(() => {
    if (profile) {
      setFormData({
        hoDem: profile.hoDem || "",
        ten: profile.ten || "",
        gioiTinh: profile.gioiTinh || true,
        ngaySinh2: profile.ngaySinh2 || "",
        noiSinh:
          validateOption(
            profile.noiSinh,
            provinces.map((province) => province.id)
          ) || null,
        noisinhIdhuyen:
          validateOption(
            profile.noisinhIdhuyen,
            districtsByLocation.noiSinh.map((district) => district.id)
          ) || null,
        noisinhIdphuongxa:
          validateOption(
            profile.noisinhIdphuongxa,
            wardsByLocation.noiSinh.map((ward) => ward.id)
          ) || null,
        soCMND: profile.soCMND || "",
        ngayCap: profile.ngayCap || null,
        email: profile.email || "",
        soDienThoai: profile.soDienThoai || "",
        soDienThoai2: profile.soDienThoai2 || "",
        quocTich: profile.quocTich || "",
        mabhxhYt: profile.mabhxhYt || "",
        nguyenQuan: profile.nguyenQuan || null,
        hkttIdhuyen: profile.hkttIdhuyen || null,
        hkttIdtinh: profile.hkttIdtinh || null,
        hkttIdphuongxa: profile.hkttIdphuongxa || null,
        hkttThonxom: profile.hkttThonxom || "",
        dcllIdtinh: profile.dcllIdtinh || null,
        dcllIdhuyen: profile.dcllIdhuyen || null,
        dcllIdphuongxa: profile.dcllIdphuongxa || null,
        dcllSonha: profile.dcllSonha || "",
        ngayVaoDoan: profile.ngayVaoDoan || null,
        ngayVaoDang: profile.ngayVaoDang || null,
        height: profile.height || 0,
        weight: profile.weight || 0,
        schoolEmail: profile.schoolEmail || "",
        iddanToc: profile.iddanToc || null,
        idtonGiao: profile.idtonGiao || null,
        idtinh: profile.idtinh || null,
        idhuyen: profile.idhuyen || null,
        idphuongXa: profile.idphuongXa || null,
        idtinhCapCMND: profile.idtinhCapCMND || null,
      });
    }
  }, [profile]);

  const debouncedFormData = useDebounce(formData, 500);
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
  console.log(formData.gioiTinh);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData)); // Dispatch the updateProfile action with formData
  };

  const messageAccess = useSelector(
    (state) => state.profile.getCheckUpdateProfile?.message
  );
  const successAccess = useSelector(
    (state) => state.profile.getCheckUpdateProfile?.success
  );
  // const successAccess = true;
  return (
    <>
      <Box>
        <Box>
          <Typography
            sx={{
              fontSize: "13px",
              color: "red",
              fontWeight: "600",
            }}
          >
            {messageAccess}
          </Typography>
        </Box>
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
                    successAccess={successAccess}
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
                  onChange={handleChange}
                  successAccess={successAccess}
                  sx={selectStyles}
                  options={genders}
                />
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
                    successAccess={successAccess}
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
                  successAccess={successAccess}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <SelectField
                  name="idtonGiao"
                  value={formData.idtonGiao}
                  onChange={handleChange}
                  options={religions}
                  label="Tôn giáo"
                  successAccess={successAccess}
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
                    successAccess={successAccess}
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
                    successAccess={successAccess}
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
                    label="Quê quán Phường/ xã"
                    successAccess={successAccess}
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
                  successAccess={successAccess}
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
                  successAccess={successAccess}
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
                  successAccess={successAccess}
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

                  <TextFieldWrapper
                    name="nguyenQuan"
                    value={formData.nguyenQuan || ""}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  successAccess={successAccess}
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
                  successAccess={successAccess}
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
                  successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="hkttThonxom"
                    value={formData.hkttThonxom || ""}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  successAccess={successAccess}
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
                  successAccess={successAccess}
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
                  successAccess={successAccess}
                />
              </Grid>
              <Grid item xs={12} lg={4.5}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "2px" }}
                >
                  <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                    Địa chỉ liên lạc cụ thể
                  </Typography>
                  <TextFieldWrapper
                    name="dcllSonha"
                    value={formData.dcllSonha || ""}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="soCMND"
                    value={formData.soCMND || ""}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="ngayCap"
                    type="date"
                    value={formData.ngayCap || ""}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="quocTich"
                    value={formData.nation}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="ngayVaoDang"
                    type="date"
                    value={formData.ngayVaoDang}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="ngayVaoDoan"
                    type="date"
                    value={formData.ngayVaoDoan}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="schoolEmail"
                    value={formData.schoolEmail}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="soDienThoai"
                    value={formData.soDienThoai}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="soDienThoai2"
                    value={formData.soDienThoai2}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    successAccess={successAccess}
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
                  <TextFieldWrapper
                    name="mabhxhYt"
                    value={formData.mabhxhYt}
                    onChange={handleChange}
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
    </>
  );
};

export default PersonalInfo;
