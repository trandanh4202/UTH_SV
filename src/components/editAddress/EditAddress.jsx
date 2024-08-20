/* eslint-disable react/prop-types */
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
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { EditAddress } from "../../features/addressSlice/AddressSlice";
import {
  getDistrictViettel,
  getProvinceViettel,
  getWardViettel,
} from "../../features/viettelSlice/ViettelSlice";
import { EditOutlined } from "@mui/icons-material";
import { updateAddress } from "../../features/addressSlice/AddressSlice";
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
    border: "3px solid #0085885a",
    alignItems: "center",
    transition: "all ease 0.4s",
    padding: { xs: "10px", lg: "9px 14px" },
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
          <MenuItem
            key={
              optionType === "province"
                ? option.PROVINCE_ID
                : optionType === "district"
                ? option.DISTRICT_ID
                : optionType === "ward"
                ? option.WARDS_ID
                : option.id
            }
            value={
              optionType === "province"
                ? option.PROVINCE_ID
                : optionType === "district"
                ? option.DISTRICT_ID
                : optionType === "ward"
                ? option.WARDS_ID
                : option.id
            }
          >
            {optionType === "province"
              ? option.PROVINCE_NAME
              : optionType === "district"
              ? option.DISTRICT_NAME
              : optionType === "ward"
              ? option.WARDS_NAME
              : option.name}
          </MenuItem>
        ))}
    </Select>
  </Box>
);

const TextFieldWrapper = ({
  name,
  value,
  onChange,
  label,
  type = "text",
  multi,
}) => {
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
        // multiline={multi}
        required
        sx={{ ...inputStyles, width: "100%" }}
      />
    </Box>
  );
};

const EditAddress = ({ editData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [formData, setFormData] = useState({
    provinceId: editData.PROVINCE_ID || 0,
    districtId: editData.DISTRICT_ID || 0,
    wardId: editData.WARDS_ID || 0,
    detail: editData.detail || 0,
    phoneNumber: editData.phoneNumber || 0,
  });
  const [id, setId] = useState(editData.id);
  const dispatch = useDispatch();
  const addMessage = useSelector(
    (state) => state.address.updateMessage?.message
  );
  const addStatus = useSelector((state) => state.address.updateMessage?.status);
  const success = useSelector((state) => state.address.updateMessage?.success);
  const [isAddAddress, setIsAddAddress] = useState(false);

  const navigate = useNavigate();

  const provinces = useSelector((state) => state.viettel.province.data);
  const districts = useSelector((state) => state.viettel.district.data) || [];
  const wards = useSelector((state) => state.viettel.ward?.data) || [];
  const loading = useSelector((state) => state.address.loading);
  const [editAddressPopUpOpen, setEditAddressPopUpOpen] = useState(false);
  useEffect(() => {
    if (editAddressPopUpOpen) {
      dispatch(getProvinceViettel());
      if (editData.PROVINCE_ID) {
        dispatch(getDistrictViettel(editData.PROVINCE_ID));
        if (editData.DISTRICT_ID) {
          dispatch(getWardViettel(editData.DISTRICT_ID));
        }
      }
    }
  }, [dispatch, editData, editAddressPopUpOpen]);

  useEffect(() => {
    if (editAddressPopUpOpen) {
      if (formData.provinceId) {
        dispatch(getDistrictViettel(formData.provinceId)).then(() => {
          setFormData((prev) => ({
            ...prev,
            districtId: 0,
            wardId: 0,
          }));
        });
      }
    }
  }, [dispatch, formData.provinceId]);

  useEffect(() => {
    if (editAddressPopUpOpen) {
      if (formData.districtId) {
        dispatch(getWardViettel(formData.districtId)).then(() => {
          setFormData((prev) => ({
            ...prev,
            wardId: 0,
          }));
        });
      }
    }
  }, [dispatch, formData.districtId]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const onSubmit = async () => {
    await dispatch(updateAddress({ formData, id }));
    // onClose();
  };
  useEffect(() => {
    if (!loading) {
      if (addMessage && success === true && addMessage) {
        toast.success(addMessage);
        // localStorage.clear();
      } else if (success === false) {
        toast.error(addMessage);
      }
    }
  }, [loading, success, addMessage, addStatus]);
  const handleEditClick = () => {
    setEditAddressPopUpOpen(true);
  };

  const handleEditCancel = () => {
    setEditAddressPopUpOpen(false);
  };
  return (
    <>
      <IconButton
        onClick={handleEditClick}
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
            color: "red",
            boxShadow: "0 0 10px #008689",
          },
        }}
      >
        <EditOutlined sx={{ fontSize: "30px" }} />
      </IconButton>
      <Modal open={editAddressPopUpOpen} onClose={handleEditCancel}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
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
            Sửa địa chỉ nhận đơn
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
              <Grid item xs={12} lg={3}>
                <SelectField
                  name="provinceId"
                  value={formData.provinceId || ""}
                  onChange={handleChange}
                  options={provinces}
                  label="Tỉnh/ Thành phố"
                  optionType="province"
                />
              </Grid>

              <Grid item xs={12} lg={3}>
                <SelectField
                  name="districtId"
                  value={formData.districtId || ""}
                  onChange={handleChange}
                  disabled={!formData.provinceId}
                  options={districts}
                  label="Quận/ Huyện"
                  optionType="district"
                />
              </Grid>

              <Grid item xs={12} lg={3}>
                <SelectField
                  name="wardId"
                  value={formData.wardId || ""}
                  onChange={handleChange}
                  disabled={!formData.districtId}
                  options={wards}
                  label="Phường/ Xã"
                  optionType="ward"
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextFieldWrapper
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  label="Số điện thoại"
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextFieldWrapper
                  name="detail"
                  label="Địa chỉ cụ thể"
                  value={formData.detail}
                  onChange={handleChange}
                  // sx={inputStyles}
                  multi={true}
                />
              </Grid>
            </Grid>
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

export default EditAddress;
